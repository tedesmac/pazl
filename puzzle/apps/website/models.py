from django.db import models


class Website(models.Model):
    description = models.CharField(max_length=200)
    name = models.CharField(max_length=50)

    class Meta:
        db_table = 'puzzle_website'
