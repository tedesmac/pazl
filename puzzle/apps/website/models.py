from django.conf import settings
from django.db import models
from os import path


class Website(models.Model):
    description = models.CharField(max_length=200, blank=True, null=False)
    logo = models.ImageField(upload_to='site', null=True, blank=True)
    name = models.CharField(max_length=50, blank=True, null=False)
    home_page = models.ForeignKey(
        'page.Page',
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )

    class Meta:
        db_table = 'puzzle_website'

    @property
    def logo_url(self):
        if self.logo:
            _, tail = path.split(self.logo.name)
            return '{}site/{}/'.format(settings.MEDIA_URL, tail)
        return '{}img/favicon/favicon-310.png/'.format(
            settings.STATIC_URL
        )

    @staticmethod
    def get():
        try:
            website = Website.objects.get(id=1)
        except:
            website = Website.objects.create()
        return website

    @staticmethod
    def get_description():
        try:
           website = Website.objects.get(id=1)
           return website.description
        except:
            return ''

    @staticmethod
    def get_home_page():
        try:
            website = Website.objects.get(id=1)
            return website.home_page
        except:
            return None

    @staticmethod
    def get_logo():
        try:
            website = Website.objects.get(id=1)
            return website.logo_url
        except:
            return '{}img/favicon/favicon-310.png/'.format(
                settings.STATIC_URL
            )

    @staticmethod
    def get_name():
        try:
            website = Website.objects.get(id=1)
            return website.name
        except:
            return ''
