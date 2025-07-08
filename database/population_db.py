from .engine import Base, db_engine

from .models import Category, Product, Manufacturer, Review


tables = [
    Category.__table__,
    Product.__table__,
    Manufacturer.__table__,
    Review.__table__,
]


def create_table():
    Base.metadata.create_all(db_engine, tables=tables)


if __name__ == '__main__':
    create_table()