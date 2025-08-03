from sqlalchemy import select, desc, or_, and_, func
from sqlalchemy.orm import joinedload

from .engine import session_factory
from .models import Category, Product, Manufacturer


def get_products_by_category(slug: str):
    with session_factory() as session:
        get_category = select(Category).filter(Category.slug==slug)
        category = session.execute(get_category).scalars().first()

        get_products_list = select(Product).filter(Product.category_id==category.id).options(joinedload(Product.category))
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


def get_similar_products_to_cart_and_wishlist(product_list: list, limit: int = 12):
    with session_factory() as session:
        if not product_list:
            return session.query(Product).order_by(Product.manufacturer_id.desc()).limit(limit).options(joinedload(Product.category)).all()
        conditions = []
        ids = list(map(int, product_list))
        products = session.query(Product).filter(Product.id.in_(ids)).options(joinedload(Product.category)).all()

        for prod in products:
            name_key = prod.name.split()[0] if prod.name else ""

            cond = and_(
                Product.category_id == prod.category_id,
                Product.manufacturer_id == prod.manufacturer_id,
                Product.name.ilike(f"%{name_key}%"),
            )
            conditions.append(cond)

        similar_products = session.query(Product).filter(or_(*conditions)).limit(limit).options(joinedload(Product.category)).all()
        for i in similar_products:
            print(i.name)
        return similar_products