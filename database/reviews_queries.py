from sqlalchemy import select, desc

from .engine import session_factory
from .models import Review


def get_rewievs_all():
    with session_factory() as session:
        get_rewievs = select(Review)
        reviews_list = session.execute(get_rewievs).scalars().all()
    return reviews_list


def add_new_review(username: str, comment: str, rating: int):
    with session_factory() as session:
        review = Review(
            username=username,
            comment=comment,
            rating=rating
        )
        session.add(review)
        session.commit()