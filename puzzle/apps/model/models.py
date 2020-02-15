from django.db import models
from puzzle.utils.models import BaseModel


class Model(BaseModel):

    class Meta:
        db_table = 'puzzle_model'
