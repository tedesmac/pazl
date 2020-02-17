from django.db import models
from puzzle.apps.website.models import Website
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
        home_page = Website.get_home_page()
        if home_page:
            if home_page.id == self.id:
                self.parent = None
                self.slug = ''
                return self.slug
        slug = super().build_path()
        if self.parent:
            slug = '{}{}/'.format(self.parent.build_path(), slug)
        else:
            slug = '{}/'.format(slug)
        return slug
