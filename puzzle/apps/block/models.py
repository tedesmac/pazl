from django.db import models
from puzzle.utils.models import BaseModel


class Block(BaseModel):
    model = models.ForeignKey(
        'model.Model',
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )

    class Meta:
        db_table = "puzzle_block"
