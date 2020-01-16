from django.db import models
import json


class Model(models.Model):
    data = models.TextField()
    name = models.CharField(max_length=50)

    class Meta:
        db_table = 'puzzle_model'

    @property
    def data_as_json(self):
        return json.loads(self.data)
