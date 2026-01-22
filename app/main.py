from flask import Flask, request, send_from_directory
from sqlalchemy import text, delete
from sqlalchemy.exc import IntegrityError

from app.db import engine, get_session
from app.models import Base, Candidate
from app.reader import read_csv, read_xlsx

# __name__ file name if executed file, module name if executed module
app = Flask(__name__, static_folder="../static")
Base.metadata.create_all(bind=engine)


@app.route("/", methods=["get"])
def index():
    return send_from_directory("../static", "index.html")


@app.route("/candidates", methods=["post"])
def import_candidates():
    uploaded = request.files.getlist("files")
    names = [f.filename for f in uploaded]
    print(f"imported {names}")

    parsed = []

    for f in uploaded:
        if f.filename.endswith("csv"):
            parsed.extend(read_csv(f))
        elif f.filename.endswith("xlsx"):
            parsed.extend(read_xlsx(f))

    with engine.connect() as conn:
        result = conn.execute(text("select 'ok'")).scalar_one()
        print(f"result {result}")

    inserted, skipped = insert_candidates(parsed)
    result = f"{inserted} inserted {skipped} skipped"
    print(result)
    return result


def insert_candidates(rows):
    inserted = 0
    skipped = 0

    with get_session() as session:
        for r in rows:
            c = Candidate(
                name=r["name"],
                city=r["city"],
                age=r["age"],
                gender=r["gender"],
                disability=r["disability"],
                salary_expectation=r["salary_expectation"],
                tech_stack=r["tech_stack"],
            )

            try:
                with session.begin_nested():
                    session.add(c)
                    session.flush()
                inserted += 1
            except IntegrityError as e:
                print(f"error {e.orig} sql {e.statement} params {e.params}")
                skipped += 1
        return inserted, skipped


@app.route("/candidates", methods=["get"])
def list_candidates():
    with get_session() as session:
        rows = session.query(Candidate).all()
        return [
            {
                "id": r.id,
                "name": r.name,
                "city": r.city,
                "age": r.age,
                "gender": r.gender,
                "disability": r.disability,
                "salary_expectation": r.salary_expectation,
                "tech_stack": r.tech_stack,
            } for r in rows
        ]


@app.route("/candidates", methods=["delete"])
def delete_candidates():
    with get_session() as session:
        session.execute(delete(Candidate))
        return "ok"


if __name__ == "__main__":  # top level executed script name
    app.run(host="0.0.0.0", port=5000, debug=True)
