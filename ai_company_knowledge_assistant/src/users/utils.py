from sqlalchemy import or_

from src.users.models import User


def apply_user_search(query, search: str | None):
    """
    Apply search filter on users query.
    """

    if search:
        query = query.where(
            or_(
                User.full_name.ilike(f"%{search}%"),
                User.email.ilike(f"%{search}%"),
                User.role.ilike(f"%{search}%")
            )
        )

    return query


def calculate_pagination(
    page_no: int,
    page_size: int
):
    """
    Calculate offset for pagination.
    """

    offset = (page_no - 1) * page_size

    return offset