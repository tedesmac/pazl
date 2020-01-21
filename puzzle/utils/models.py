from django.db import models
from django.utils.text import slugify
import json


class BaseModel(models.Model):
    data = models.TextField(default='{}', blank=True, null=True)
    name = models.CharField(max_length=50, blank=False, null=False)

    class Meta:
        abstract = True

    @property
    def data_as_json(self):
        return json.loads(self.data)

    def save(self, *args, **kwargs):
        if type(self.data) is dict:
            pass
        super().save(*args, **kwargs)


class BasePageModel(BaseModel):
    description = models.CharField(max_length=200, blank=True, null=True)
    slug = models.SlugField(max_length=100, blank=True, null=True)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
