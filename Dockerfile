FROM python:3.11-slim

WORKDIR /workdir

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ app/
COPY static/ static/

EXPOSE 5000

ENV FLASK_APP=app/main.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV PYTHONPATH=/workdir

RUN mkdir -p /workdir/data

CMD ["flask", "run"]
