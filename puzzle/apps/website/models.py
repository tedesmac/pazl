from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


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

    @staticmethod
    def get_home_page():
        try:
            website = Website.objects.get(id=1)
            return website.home_page
        except:
            return None

    @staticmethod
    def get_name():
        try:
            website = Website.objects.get(id=1)
            return website.name
        except:
            return ''


@receiver(post_save, sender=Website)
def update_home(sender, **kwargs):
    site = kwargs['instance']
    if site.home_page:
        if site.home_page.path != '':
            site.home_page.save()
