import json
import re

from django.conf import settings
from django.shortcuts import render

from puzzle.apps.entry.models import Entry
from puzzle.apps.page.models import Page
from puzzle.apps.website.models import Website
from puzzle.apps.page.serializers import PageSerializer
from puzzle.utils.views import DetailAPIView, ListAPIView


entry_re = re.compile(r'^[^/]+\/(\d+)\/[^/]+\/$')


def base_state(request):
    """
    Get the current view base state

    :param request: View's request
    :returns: dict -- The base state
    """
    state = {}

    description = Website.get_description()
    home_page = Website.get_home_page()
    logo = Website.get_logo()
    name = Website.get_name()
    state['site'] = {
        'description': description,
        'home_page': home_page.id if home_page else None,
        'logo': logo,
        'name': name,
    }

    pages = Page.objects.all().filter(published=True)
    pages = [
        {
            'description': page.description,
            'id': page.id,
            'name': page.name,
            'parent': page.parent,
            'path': page.slug,
            'published': True,
            'slug': page.slug,
        } for page in pages if page.id != home_page
    ]
    state['pages'] = list(pages)

    user = None
    if request.is_authenticated:
        user = {
            'id': request.user.id,
            'perms': request.user.role_permissions(),
            'role': request.user.role,
            'username': request.user.username,
        }
    state['user'] = user

    return state


def entry_state(request, entry):
    """
    Returns entry state
    """
    state = base_state(request)
    state['page'] = {
        'blocks': entry.blocks,
        'description': entry.description,
        # TODO: error should be on the top state
        'error': False,
        'id': entry.id,
        'image': entry.image,
        'isEntry': True,
        # TODO: Add model block
        'modelBlock': None,
        'modelId': entry.model.id,
        'name': entry.name,
        'slug': entry.slug,
        # TODO: add style
        'style': {},
    }
    return state


def page_state(request, page):
    """
    Returns page state
    """
    state = base_state(request)
    state['page'] = {
        'blocks': page.blocks,
        'description': page.description,
        # TODO: error should be on the top state
        'error': False,
        'id': page.id,
        'image': page.image,
        'isEntry': False,
        'modelBlock': None,
        'modelId': 0,
        'name': page.name,
        'slug': page.slug,
        # TODO: add style
        'style': {},
    }
    return state


def home_page(request):
    return page(request, '')


def page(request, path):
    path = '/{}'.format(path)
    host = 'http://{}'.format(request.get_host())
    match = entry_re.match(path)
    instance = None
    meta = {
        'description': '',
        'image': '',
        'site_name': Website.get_name(),
        'state': '{}',
        'title': '',
        'url': '',
    }
    state = {}

    if match:
        entry_id = int(match.group(1))
        try:
            instance = Entry.objects.get(id=entry_id)
            state = entry_state(request, instance)
            meta['url'] = '{}/{}/entry/{}/'.format(
                host,
                settings.PAZL_BASE_PATH,
                instance.id,
            )
        except:
            instance = None
    else:
        try:
            instance = Page.objects.get(path=path)
            state = page_state(request, instance)
            meta['url'] = '{}/{}/page/{}/'.format(
                host,
                settings.PAZL_BASE_PATH,
                instance.id,
            )
        except:
            instance = None

    if instance:
        if state['page']['description']:
            meta['description'] = state['page']['description']
        else:
            meta['description'] = state['site']['description']

        if state['page']['image']:
            meta['image'] = '{}{}'.format(host, state['page']['image'])
        else:
            meta['image'] = '{}{}'.format(host, state['site']['logo'])

        meta['title'] = state['page']['name']
        meta['state'] = state

    return render(request, 'page.html', meta)


class PageDetailAPI(DetailAPIView):

    class Meta:
        model = Page
        serializer = PageSerializer


class PageListAPI(ListAPIView):

    class Meta:
        model = Page
        serializer = PageSerializer
