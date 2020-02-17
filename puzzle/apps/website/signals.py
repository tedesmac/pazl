from django.db.models.signals import post_save
from django.dispatch import receiver
from puzzle.apps.page.models import Page
from puzzle.apps.website.models import Website


@receiver(post_save, sender=Website)
def update_home(sender, **kwargs):
    site = kwargs['instance']
    if site.home_page:
        if site.home_page.path != '':
            site.home_page.save()
    elif len(Page.objects.all()) == 1 and site.home_page is None:
        page = Page.objects.first()
        site.home_page = page
        site.save()
