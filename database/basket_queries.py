from sqlalchemy import select
from sqlalchemy.orm import joinedload

from .engine import session_factory
from .models import Product


def get_approved_basket_items(basket: list[dict], client_total: float):
    if not basket:
        return False, "Кошик порожній", []

    ids = [int(item["id"]) for item in basket]

    with session_factory() as session:
        products_query = select(Product).where(
            Product.id.in_(ids),
            Product.status == "active"
        ).options(joinedload(Product.category), joinedload(Product.manufacturer))

        db_products = session.execute(products_query).scalars().all()

        if len(db_products) != len(basket):
            return False, "Деякі товари не знайдено або недоступні", []

        db_product_map = {product.id: product for product in db_products}

        calculated_total = 0

        for item in basket:
            product_id = int(item["id"])
            quantity = item.get("quantity", 1)
            client_price = item.get("price")

            product = db_product_map.get(product_id)
            if not product:
                return False, f"Товар з ID {product_id} не знайдено", []

            # Перевірка ціни
            if round(product.price, 2) != round(client_price, 2):
                return False, f"Ціна товару '{product.name}' змінилася", []

            # Перевірка загальної суми за товар
            expected_item_total = round(product.price * quantity, 2)
            client_item_total = round(item.get("total", expected_item_total), 2)

            if expected_item_total != client_item_total:
                return False, f"Невірна сума за товар '{product.name}'", []

            # Додаємо до загальної суми
            calculated_total += expected_item_total

        # Перевірка загальної суми
        if round(calculated_total, 2) != round(client_total, 2):
            return False, f"Загальна сума не збігається (очікувано {calculated_total}, отримано {client_total})", []
        
    return True, "OK", db_products
