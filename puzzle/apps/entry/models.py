from django.db import models
from puzzle.utils.models import BasePageModel


class Entry(BasePageModel):
    author = models.ForeignKey(
        'user.User',
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    model = models.ForeignKey(
        'model.Model',
        on_delete=models.CASCADE,
        blank=False,
        null=False,
    )

    class Meta:
        db_table = 'puzzle_entry'
