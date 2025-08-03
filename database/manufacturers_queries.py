from sqlalchemy import select, desc

from .engine import session_factory
from .models import Manufacturer


def get_manufacturers():
    with session_factory() as session:
        get_all_manufacturers = select(Manufacturer)
        manufacturers_list = session.execute(get_all_manufacturers).scalars().all()
    return manufacturers_list