import json

from django.db import models
from django.db.models.signals import post_init
from django.utils.text import slugify
from django.utils.timezone import now
from simple_history.models import HistoricalRecords


class BaseModel(models.Model):
    _data = models.TextField(default='{}')
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=50, blank=True)

    class Meta:
        abstract = True

    @property
    def blocks(self):
        if 'blocks' in self.data:
            return self.data['blocks']
        return []

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
    date_published = models.DateTimeField(null=True, blank=True, default=None)
    description = models.CharField(max_length=200, blank=True)
    image = models.CharField(max_length=2000, blank=True)
    path = models.CharField(max_length=2000, blank=True, unique=True)
    published = models.BooleanField(default=False)
    slug = models.SlugField(max_length=100, blank=True)
    history = HistoricalRecords(
        excluded_fields=[
            'date_created',
            'date_modified',
            'date_published',
            'published',
        ],
        inherit=True
    )

    _published = False

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

        if self._published != self.published:
            if self.published:
                self.date_published = now()
            else:
                self.date_published = None

        super().save(*args, **kwargs)
        self._published = self.published


def init_base_page_model(sender, instance, **kwargs):
    instance._published == instance.published


post_init.connect(init_base_page_model, sender=BasePageModel)
