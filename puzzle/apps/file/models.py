from django.conf import settings
from django.db import models
from os import path


class Image(models.Model):
    image = models.ImageField()
    name = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        db_table = 'puzzle_image'

    @property
    def url(self):
        _, tail = path.split(self.image.name)
        return '{}img/{}/'.format(settings.MEDIA_URL, tail)
