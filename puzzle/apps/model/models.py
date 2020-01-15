from django.db import models


class Model(models.Model):
    data = models.TextField()
    name = models.CharField(max_length=50)

    class Meta:
        db_table = 'puzzle_model'
