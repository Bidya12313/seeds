from sqlalchemy import select, desc
from sqlalchemy.orm import joinedload

from .engine import session_factory
from .models import Category, Product, Manufacturer


def get_products_by_category(slug: str):
    with session_factory() as session:
        get_category = select(Category).filter(Category.slug==slug)
        category = session.execute(get_category).scalars().first()

        get_products_list = select(Product).filter(Product.category_id==category.id)
        products_list_by_category = session.execute(get_products_list).scalars().all()
    return products_list_by_category, category.name


def get_products_by_info_below(country_slug: str = None, manufacturer_slug: str = None):
    with session_factory() as session:
        if manufacturer_slug:
            get_manufacturer = select(Manufacturer).filter(Manufacturer.slug==manufacturer_slug)
            manufacturer = session.execute(get_manufacturer).scalars().first()
            get_products_list = select(Product).filter(Product.manufacturer_id==manufacturer.id).options(joinedload(Product.category))
            products_list = session.execute(get_products_list).scalars().all()
            
        if country_slug:
            get_products_list = select(Product).filter(Product.country_slug==country_slug).options(joinedload(Product.category))
            products_list = session.execute(get_products_list).scalars().all()

        return products_list


def get_product(product_id: int):
    with session_factory() as session:
        get_product = select(Product).filter(Product.id==product_id)
        product = session.execute(get_product).scalars().first()

        get_category = select(Category.name).filter(Category.id==product.category_id)
        category = session.execute(get_category).scalars().first()

        get_manufacturer = select(Manufacturer).filter(Category.id==product.category_id)
        manufacturer = session.execute(get_manufacturer).scalars().first()
    return product, category, manufacturer


def get_similar_products(product: Product, limit: int = 12):
    first_word = product.name.split()[0]

    with session_factory() as session:
        query = (
            select(Product)
            .where(Product.category_id == product.category_id)
            .where(Product.id != product.id)
            .where(Product.name.ilike(f"%{first_word}%"))
            .limit(limit)
        )
    return session.execute(query).scalars().all()
