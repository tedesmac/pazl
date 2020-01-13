from django.db import models


class Website(models.Model):
    description = models.CharField(max_length=200, blank=True, null=False)
    name = models.CharField(max_length=50, blank=True, null=False)

    class Meta:
        db_table = 'puzzle_website'
