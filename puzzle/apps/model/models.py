from django.db import models
import json


class Model(models.Model):
    data = models.TextField()
    name = models.CharField(max_length=50)

    class Meta:
        db_table = 'puzzle_model'

    @property
    def data_as_json(self):
        if type(self.data) is dict:
            return self.data
        return json.loads(self.data)

    @data_as_json.setter
    def data_as_json(self, data: dict):
        print(data)
        self.data = json.dumps(data)

    def save(self, *args, **kwargs):
        if type(self.data) is dict:
            self.data = json.dumps(self.data)
        super().save(*args, **kwargs)
