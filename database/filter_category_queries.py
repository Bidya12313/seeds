from sqlalchemy import select, desc

from .engine import session_factory
from .models import Category, Product, Manufacturer


def get_products_by_category():
    pass