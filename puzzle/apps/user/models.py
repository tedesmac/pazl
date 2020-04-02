from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    class RoleChoices(models.TextChoices):
        ADMIN = 'admin'
        EDITOR = 'editor'
        OWNER = 'owner'
        USER = 'user'

    class Meta:
        db_table = 'puzzle_user'

    role = models.CharField(
        max_length=8,
        choices=RoleChoices.choices,
        default=RoleChoices.USER,
    )

    def role_permissions(self) -> dict:
        if self.role == User.RoleChoices.OWNER or \
           self.role == User.RoleChoices.ADMIN:
            return {
                'blocks': 7,
                'entries': 15,
                'models': 7,
                'pages': 15,
                'users': 15,
            }
        if self.role == User.RoleChoices.EDITOR:
            return {
                'blocks': 7,
                'entries': 15,
                'models': 7,
                'pages': 15,
                'users': 0,
            }
        return {
            'blocks': 0,
            'entries': 5,
            'models': 0,
            'pages': 5,
            'users': 0,
        }
