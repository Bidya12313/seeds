from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

from .config import db_url


db_engine = create_engine(
    url=db_url,
    echo=False
)

session_factory = sessionmaker(db_engine)


class Base(DeclarativeBase):
    pass