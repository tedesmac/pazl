from django.db import models
from django.utils.text import slugify
import json
from simple_history.models import HistoricalRecords


class BaseModel(models.Model):
    _data = models.TextField(default='{}')
    name = models.CharField(max_length=50, blank=True)

    class Meta:
        abstract = True

    @property
    def data(self):
        if type(self._data) == str:
            return json.loads(self._data)
        return self._data

    @data.setter
    def data(self, value):
        data = value
        if type(value) == dict:
            data = json.dumps(value, separators=(',', ':'), sort_keys=True)
        self._data = data


class BasePageModel(BaseModel):
    description = models.CharField(max_length=200, blank=True)
    image = models.CharField(max_length=2000, blank=True)
    path = models.CharField(max_length=2000, blank=True, unique=True)
    published = models.BooleanField(default=False)
    slug = models.SlugField(max_length=100, blank=True)
    history = HistoricalRecords(excluded_fields=['published'], inherit=True)

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
