from django.db import models
from django.utils.text import slugify
import json


class BaseModel(models.Model):
    data = models.TextField(default='{}')
    name = models.CharField(max_length=50, blank=True)

    class Meta:
        abstract = True

    @property
    def data_as_json(self):
        return json.loads(self.data)

    def save(self, *args, **kwargs):
        if type(self.data) is dict:
            pass
        self.name = self.name.lower()
        super().save(*args, **kwargs)


class BasePageModel(BaseModel):
    description = models.CharField(max_length=200, blank=True)
    path = models.CharField(max_length=2000, blank=True, unique=True)
    published = models.BooleanField(default=False)
    slug = models.SlugField(max_length=100, blank=True)

    class Meta:
        abstract = True

    def build_path(self):
        slug = ''
        if not self.slug:
            slug = slugify(self.name.lower())
        else:
            slug = self.slug
        return slug

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name.lower())
        self.path = self.build_path()
        super().save(*args, **kwargs)
