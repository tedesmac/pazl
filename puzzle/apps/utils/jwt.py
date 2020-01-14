from datetime import datetime, timedelta
from django.conf import settings
import jwt
from puzzle.apps.user.models import User
from typing import Union


def generate(user: User) -> str:
    """Generates a new token"""
    token = jwt.encode(
        {
            'user': user.id,
            'exp': datetime.utcnow() + timedelta(days=7)
        },
        settings.SECRET_KEY,
        algorithm='HS256'
    )
    return token.decode('utf-8')


def validate(token: str) -> Union[User, None]:
    """
    Verifies token and returns the token's owner. If the token is invalid
    returns none.
    """
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=['HS256']
        )
    except:
        return None

    try:
        user = User.objects.get(id=payload['user'])
    except User.DoesNotExist:
        user = None

    return user
