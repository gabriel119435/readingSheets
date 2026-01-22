from sqlalchemy import Column, Integer, String, Boolean, UniqueConstraint, Index

from db import Base


class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    city = Column(String, nullable=False)

    age = Column(Integer)
    gender = Column(String)
    disability = Column(Boolean)

    salary_expectation = Column(Integer)
    tech_stack = Column(String, nullable=False)

    __table_args__ = (
        UniqueConstraint("name", "city", name="uq_candidate_name_city"),
        Index("ix_candidates_tech_stack", "tech_stack"),
    )
