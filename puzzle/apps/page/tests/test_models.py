import pytest

from puzzle.apps.entry.models import Entry
from puzzle.apps.model.models import Model
from puzzle.apps.page.models import Page
from puzzle.apps.page.serializers import PageSerializer
from puzzle.apps.user.models import User
from puzzle.apps.website.models import Website
from puzzle.apps.website.signals import *


@pytest.mark.django_db
def test_page_build_path_simple():
    page = Page.objects.create(name='Home')
    path = page.build_path()
    assert path == '/home'


@pytest.mark.django_db
def test_page_build_path_two():
    parent = Page.objects.create(name='Parent')
    child = Page.objects.create(name='Child', parent=parent)
    path = child.build_path()
    assert path == '/parent/child'


@pytest.mark.django_db
def test_page_build_path_three():
    grandparent = Page.objects.create(name='Grand Parent')
    parent = Page.objects.create(name='Parent', parent=grandparent)
    child = Page.objects.create(name='Child', parent=parent)
    path = child.build_path()
    assert path == '/grand-parent/parent/child'


@pytest.mark.django_db
def test_page_date_published_is_none():
    page = Page.objects.create(name='Some Page')
    assert page.date_published == None


@pytest.mark.django_db
def test_page_date_published_not_none():
    page = Page.objects.create(name='Some Page', published=True)
    assert page.date_published != None


@pytest.mark.django_db
def test_page_data_property():
    page = Page.objects.create()
    assert page.data == {}
    page.data = { 'test': 'test' }
    assert page._data == '{"test":"test"}'
    assert isinstance(page.data, dict)


@pytest.mark.django_db
def test_home_page_path():
    page = Page.objects.create(name='test')
    site = Website.objects.create(home_page=page)
    assert page.path == '/'


@pytest.mark.django_db
def test_auto_home_page():
    page = Page.objects.create(name='test')
    site = Website.objects.create()
    assert page == site.home_page
