from sqlalchemy import select, desc, or_, and_, func
from sqlalchemy.orm import joinedload

from .engine import session_factory
from .models import Category, Product, Manufacturer


def get_products_by_category(slug: str, sort: str = "default"):
    with session_factory() as session:
        get_category = select(Category).filter(Category.slug == slug)
        category = session.execute(get_category).scalars().first()

        if not category:
            return []

        query = select(Product).filter(Product.category_id == category.id).options(joinedload(Product.category))

        active_first = (Product.status == 'active').desc()

        if sort == "cheap":
            query = query.order_by(Product.price.asc())
        elif sort == "expensive":
            query = query.order_by(Product.price.desc())
        elif sort == "abc":
            query = query.order_by(Product.name.asc())
        elif sort == "xyz":
            query = query.order_by(Product.name.desc())

        query = query.order_by(active_first)

        products_list_by_category = session.execute(query).scalars().all()
        
    return products_list_by_category, category.name



def get_products_by_info_below(country_slug: str = None, manufacturer_slug: str = None, sort: str = "default"):
    with session_factory() as session:
        if manufacturer_slug:
            get_manufacturer = select(Manufacturer).filter(Manufacturer.slug==manufacturer_slug)
            manufacturer = session.execute(get_manufacturer).scalars().first()
            get_products_list = select(Product).filter(Product.manufacturer_id==manufacturer.id).options(joinedload(Product.category))
            title = f'{manufacturer.name} - MeloFlora'
            
        if country_slug:
            get_products_list = select(Product).filter(Product.country_slug==country_slug).options(joinedload(Product.category))
            country_name = session.execute(select(Product.country).filter(Product.country_slug == country_slug).limit(1)).scalar_one_or_none()
            title = f'{country_name} - MeloFlora'

        active_first = (Product.status == 'active').desc()

        if sort == "cheap":
            get_products_list = get_products_list.order_by(Product.price.asc())
        elif sort == "expensive":
            get_products_list = get_products_list.order_by(Product.price.desc())
        elif sort == "abc":
            get_products_list = get_products_list.order_by(Product.name.asc())
        elif sort == "xyz":
            get_products_list = get_products_list.order_by(Product.name.desc())

        get_products_list = get_products_list.order_by(active_first)
        
        products_list = session.execute(get_products_list).scalars().all()

    return products_list, title


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
    if not product.name:
        return []

    words = product.name.split()
    name_keys = [w for w in words if len(w) > 2]

    with session_factory() as session:
        conditions = []
        for key in name_keys:
            conditions.append(Product.name.ilike(f"%{key}%"))

        if conditions:
            query = (
                select(Product)
                .where(Product.id != product.id)
                .where(Product.category_id == product.category_id)
                .where(or_(*conditions))
                .filter(Product.status == 'active')
                .options(joinedload(Product.category))
                .limit(limit)
            )
            results = session.execute(query).scalars().all()
            if results:
                return results

        query = (
            select(Product)
            .where(Product.id != product.id)
            .where(Product.category_id == product.category_id)
            .filter(Product.status == 'active')
            .options(joinedload(Product.category))
            .limit(limit)
        )
        results = session.execute(query).scalars().all()
        if results:
            return results

        query = (
            select(Product)
            .filter(Product.status == 'active')
            .order_by(func.random())
            .limit(limit)
            .options(joinedload(Product.category))
        )
        results = session.execute(query).scalars().all()
    return results


def get_similar_products_to_cart_and_wishlist(product_list: list[int], limit: int = 20):
    if not product_list:
        with session_factory() as session:
            return session.execute(
                select(Product)
                .filter(Product.status == 'active')
                .order_by(Product.id.desc())
                .limit(limit)
                .options(joinedload(Product.category), joinedload(Product.manufacturer))
            ).scalars().all()

    with session_factory() as session:
        products = session.execute(
            select(Product)
            .filter(Product.id.in_(product_list))
            .options(joinedload(Product.category), joinedload(Product.manufacturer))
        ).scalars().all()

        conditions = []

        for prod in products:
            if not prod.name:
                continue

            name_key = prod.name.split()[0]

            conditions.append(and_(
                Product.category_id == prod.category_id,
                Product.manufacturer_id == prod.manufacturer_id,
                Product.name.ilike(f"%{name_key}%"),
                Product.id.notin_(product_list)
            ))

        if not conditions:
            return []

        query = (
            select(Product)
            .filter(or_(*conditions))
            .filter(Product.status == 'active')
            .order_by(Product.id.desc())
            .limit(limit)
            .options(joinedload(Product.category), joinedload(Product.manufacturer))
        )

        results = session.execute(query).scalars().all()

        unique = {product.id: product for product in results}.values()
    return list(unique)
