from django.db import models
import json


class Page(models.Model):
    data = models.TextField()
    description = models.CharField(max_length=200, blank=True, null=True)
    name = models.CharField(max_length=100, blank=False, null=False)
    slug = models.SlugField(max_length=100, blank=False, null=False)
    parent = models.ForeignKey(
        'page.Page',
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )

    class Meta:
        db_table = 'puzzle_page'

    @property
    def data_as_json(self):
        return json.loads(self.data)

    def save(self, *args, **kwargs):
        if type(self.data) is dict:
            self.data = json.dumps(self.data)
        super().save(*args, **kwargs)
