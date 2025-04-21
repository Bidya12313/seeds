from sqlalchemy import select, desc

from .engine import session_factory
from .models import Category, Product, Manufacturer


def get_products_by_category(slug: str):
    with session_factory() as session:
        get_category = select(Category).filter(Category.slug==slug)
        category = session.execute(get_category).scalars().first()

        get_products_list = select(Product).filter(Product.category_id==category.id)
        products_list_by_category = session.execute(get_products_list).scalars().all()
    return products_list_by_category, category.name