from django.shortcuts import render
from puzzle.apps.entry.models import Entry
from puzzle.apps.page.models import Page
from puzzle.apps.website.models import Website
from puzzle.apps.page.serializers import PageSerializer
from puzzle.utils.views import DetailAPIView, ListAPIView
import re


entry_re = re.compile(r'^[^/]+\/(\d+)\/[^/]+\/$')


def page(request, path):
    host = 'http://{}'.format(request.get_host())
    match = entry_re.match(path)
    instance = None
    meta = {
        'description': '',
        'image': '',
        'site_name': Website.get_name(),
        'title': '',
        'url': '',
    }

    if match:
        entry_id = int(match.group(1))
        try:
            instance = Entry.objects.get(id=entry_id)
            meta['url'] = '{}/puzzle/entry/{}/'.format(host, instance.id)
        except:
            instance = None
    else:
        try:
            instance = Page.objects.get(path=path)
            meta['url'] = '{}/puzzle/page/{}/'.format(host, instance.id)
        except:
            instance = None

    if instance:
        meta['description'] = instance.description
        meta['image'] = '{}{}'.format(host, instance.image) \
            if instance.image else ''
        meta['title'] = instance.name

    return render(request, 'page.html', meta)


class PageDetailAPI(DetailAPIView):

    class Meta:
        model = Page
        serializer = PageSerializer


class PageListAPI(ListAPIView):

    class Meta:
        model = Page
        serializer = PageSerializer
