from django.db import models
from puzzle.utils.models import BasePageModel


class Page(BasePageModel):
    parent = models.ForeignKey(
        'page.Page',
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )

    class Meta:
        db_table = 'puzzle_page'

    def build_path(self):
        slug = super().build_path()
        if self.parent:
            slug = '{}{}/'.format(self.parent.build_path(), slug)
        else:
            slug = '/{}/'.format(slug)
        return slug
