from django.db import models


class Image(models.Model):
    image = models.ImageField(upload_to='img')
    name = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        db_table = 'puzzle_image'
