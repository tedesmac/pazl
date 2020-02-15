from puzzle.apps.page.models import Page
from puzzle.apps.page.views import PageDetailAPI, PageListAPI
import pytest


@pytest.fixture
def setup():
    first = Page.objects.create(name='first')
    second = Page.objects.create(name='second')
    detail_view = PageDetailAPI.as_view()
    list_view = PageListAPI.as_view()
    return {
        'detail': detail_view,
        'list': list_view,
        'pages': [first, second],
    }


@pytest.mark.django_db
def test_detail_delete_logged(setup, rf):
    detail_view = setup['detail']
    request = rf.delete('/puzzle/api/pages/2/')
    request.is_authenticated = True
    response = detail_view(request, 2)
    assert response.status_code == 200
    all = Page.objects.all()
    assert len(all) == 1
    assert all[0].id == 1


@pytest.mark.django_db
def test_detail_delete_not_logged(setup, rf):
    detail_view = setup['detail']
    request = rf.delete('/puzzle/api/pages/2/')
    request.is_authenticated = False
    response = detail_view(request, 2)
    assert response.status_code == 403


@pytest.mark.django_db
def test_delete_object_does_not_exist(setup, rf):
    detail_view = setup['detail']
    request = rf.delete('/puzzle/api/pages/3/')
    request.is_authenticated = True
    response = detail_view(request, 3)
    assert response.status_code == 404


@pytest.mark.django_db
def test_detail_get_logged(setup, rf):
    detail_view = setup['detail']
    request = rf.get('/puzzle/api/pages/1/')
    request.is_authenticated = True
    response = detail_view(request, 1)
    assert response.status_code == 200


@pytest.mark.django_db
def test_detail_get_not_logged(setup, rf):
    detail_view = setup['detail']
    request = rf.get('/puzzle/api/pages/1/')
    request.is_authenticated = False
    response = detail_view(request, 1)
    assert response.status_code == 200


@pytest.mark.django_db
def test_detail_get_object_does_not_exist(setup, rf):
    detail_view = setup['detail']
    request = rf.get('/puzzle/api/pages/3/')
    request.is_authenticated = True
    response = detail_view(request, 4)
    assert response.status_code == 404


@pytest.mark.django_db
def test_detail_put_logged(setup, rf):
    detail_view = setup['detail']
    request = rf.put(
        'puzzle/api/pages/1/',
        {
            'published': True,
        },
        'application/json',
    )
    request.is_authenticated = True
    response = detail_view(request, 1)
    print(response.content)
    assert response.status_code == 200


@pytest.mark.django_db
def test_detail_put_not_logged(setup, rf):
    detail_view = setup['detail']
    request = rf.put(
        'puzzle/api/pages/1/',
        {
            'published': True,
        },
        'application/json',
    )
    request.is_authenticated = False
    response = detail_view(request, 1)
    assert response.status_code == 403


@pytest.mark.django_db
def test_detail_put_object_does_not_exist(setup, rf):
    detail_view = setup['detail']
    request = rf.put(
        'puzzle/api/pages/3/',
        {
            'published': True,
        },
        'application/json',
    )
    request.is_authenticated = True
    response = detail_view(request, 3)
    assert response.status_code == 404


@pytest.mark.django_db
def test_detail_put_same_path(setup, rf):
    detail_view = setup['detail']
    request = rf.put(
        'puzzle/api/pages/2/',
        {
            'name': 'first',
            'slug': 'first',
        },
        'application/json',
    )
    request.is_authenticated = True
    response = detail_view(request, 2)
    print(response.content)
    assert response.status_code == 400


@pytest.mark.django_db
def test_list_get_logged(setup, rf):
    list_view = setup['list']
    request = rf.get('puzzle/api/pages/')
    request.is_authenticated = True
    response = list_view(request)
    assert response.status_code == 200


@pytest.mark.django_db
def test_list_get_not_logged(setup, rf):
    list_view = setup['list']
    request = rf.get('puzzle/api/pages/')
    request.is_authenticated = False
    response = list_view(request)
    assert response.status_code == 200


@pytest.mark.django_db
def test_list_post_logged(setup, rf):
    list_view = setup['list']
    request = rf.post(
        'puzzle/api/pages/',
        {
            'name': 'test'
        },
        'application/json'
    )
    request.is_authenticated = True
    response = list_view(request)
    print(response.content)
    assert response.status_code == 200


@pytest.mark.django_db
def test_list_post_not_logged(setup, rf):
    list_view = setup['list']
    request = rf.post(
        'puzzle/api/pages/',
        {
            'name': 'test'
        },
        'application/json'
    )
    request.is_authenticated = False
    response = list_view(request)
    print(response.content)
    assert response.status_code == 403


@pytest.mark.django_db
def test_list_post_no_name(setup, rf):
    list_view = setup['list']
    request = rf.post(
        'puzzle/api/pages/',
        {},
        'application/json'
    )
    request.is_authenticated = True
    response = list_view(request)
    print(response.content)
    assert response.status_code == 400


@pytest.mark.django_db
def test_list_post_invalid_data(setup, rf):
    list_view = setup['list']
    request = rf.post(
        'puzzle/api/pages/',
        {
            'name': False,
        },
        'application/json'
    )
    request.is_authenticated = True
    response = list_view(request)
    print(response.content)
    assert response.status_code == 400


@pytest.mark.django_db
def test_list_post_same_path(setup, rf):
    list_view = setup['list']
    request = rf.post(
        'puzzle/api/pages/',
        {
            'name': 'first',
        },
        'application/json'
    )
    request.is_authenticated = True
    response = list_view(request)
    print(response.content)
    assert response.status_code == 400
