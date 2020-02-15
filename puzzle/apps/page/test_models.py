from puzzle.apps.page.models import Page
import pytest


@pytest.mark.django_db
def test_page_build_path_simple():
    page = Page.objects.create(name='Home')
    path = page.build_path()
    assert path == '/home/'


@pytest.mark.django_db
def test_page_build_path_two():
    parent = Page.objects.create(name='Parent')
    child = Page.objects.create(name='Child', parent=parent)
    path = child.build_path()
    assert path == '/parent/child/'


@pytest.mark.django_db
def test_page_build_path_three():
    grandparent = Page.objects.create(name='Grand Parent')
    parent = Page.objects.create(name='Parent', parent=grandparent)
    child = Page.objects.create(name='Child', parent=parent)
    path = child.build_path()
    assert path == '/grand-parent/parent/child/'
