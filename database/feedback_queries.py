from .engine import session_factory
from .models import Feedback


def add_new_feedback(username, contact, comment):
    with session_factory() as session:
        feedback = Feedback(
            username=username,
            contact=contact,
            comment=comment,
        )
        session.add(feedback)
        session.commit()