from .engine import session_factory
from .models import Order, Product

import json
from datetime import datetime


def add_order_to_db(
    customer_name: str,
    customer_contact: str,
    customer_mail: str,
    delivery_address: str,
    payment_method: str,
    total_price: float,
    basket
) -> bool:
    """Зберігає замовлення в базу даних"""
    try:
        with session_factory() as session:
            order = Order(
                customer_name=customer_name,
                customer_contact=customer_contact,
                customer_mail=customer_mail,
                delivery_address=delivery_address,
                payment_method=payment_method,
                total_price=total_price,
                items=json.dumps(basket, ensure_ascii=False),
                status="замовлено",
                created_at=datetime.utcnow()
            )
            session.add(order)
            session.commit()
            return True
    except Exception as e:
        return False