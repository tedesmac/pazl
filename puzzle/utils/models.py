from django.db import models
from django.utils.text import slugify
import json


class BaseModel(models.Model):
    _data = models.TextField(default='{}')
    name = models.CharField(max_length=50, blank=True)

    class Meta:
        abstract = True

    @property
    def data(self):
        return json.loads(self._data)

    @data.setter
    def data(self, value):
        self._data = json.dumps(value, separators=(',', ':'), sort_keys=True)


class BasePageModel(BaseModel):
    description = models.CharField(max_length=200, blank=True)
    image = models.CharField(max_length=2000, blank=True)
    path = models.CharField(max_length=2000, blank=True, unique=True)
    published = models.BooleanField(default=False)
    slug = models.SlugField(max_length=100, blank=True)

    class Meta:
        abstract = True

    def build_path(self):
        if not self.slug:
            self.slug = slugify(self.name.lower())
        else:
            self.slug = self.slug.lower()
        return self.slug

    def save(self, *args, **kwargs):
        self.path = self.build_path()
        super().save(*args, **kwargs)
