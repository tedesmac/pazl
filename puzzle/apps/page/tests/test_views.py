import json

import pytest

from puzzle.apps.entry.models import Entry
from puzzle.apps.model.models import Model
from puzzle.apps.page.models import Page
from puzzle.apps.page.views import (
    base_state,
    entry_state,
    page_state,
    page,
    PageDetailAPI,
    PageListAPI
)
from puzzle.apps.user.models import User
from puzzle.apps.website.models import Website


@pytest.fixture
def setup():
    first = Page.objects.create(name='first', published=True)
    second = Page.objects.create(name='second')
    detail_view = PageDetailAPI.as_view()
    list_view = PageListAPI.as_view()
    return {
        'detail': detail_view,
        'list': list_view,
        'pages': [first, second],
    }


# ~~~~~~~~~~~~~~~~~~~~
# Delete
# ~~~~~~~~~~~~~~~~~~~~


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


# ~~~~~~~~~~~~~~~~~~~~
# Get - Detail
# ~~~~~~~~~~~~~~~~~~~~


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


# ~~~~~~~~~~~~~~~~~~~~
# Get - List
# ~~~~~~~~~~~~~~~~~~~~


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


@pytest.fixture
def pagination():
    for i in range(20):
        name = 'page {}'.format(i + 1)
        Page.objects.create(name=name)
    list_view = PageListAPI.as_view()
    return {
        'view': list_view,
    }


@pytest.mark.django_db
def test_list_get_pagination_default(pagination, rf):
    view = pagination['view']
    request = rf.get('')
    response = view(request)
    decoded = response.content.decode()
    data = json.loads(decoded)
    assert data['has_more'] == False
    assert len(data['items']) == 20
    assert data['items_per_page'] == 100
    assert data['page'] == 1


@pytest.mark.django_db
def test_list_get_pagination_page_1(pagination, rf):
    view = pagination['view']
    request = rf.get('?items_per_page=10&page=1')
    response = view(request)
    decoded = response.content.decode()
    data = json.loads(decoded)
    assert data['has_more'] == True
    assert len(data['items']) == 10
    assert data['items_per_page'] == 10
    assert data['page'] == 1


@pytest.mark.django_db
def test_list_get_pagination_page_2(pagination, rf):
    view = pagination['view']
    request = rf.get('?items_per_page=10&page=2')
    response = view(request)
    decoded = response.content.decode()
    data = json.loads(decoded)
    assert data['has_more'] == False
    assert len(data['items']) == 10
    assert data['items_per_page'] == 10
    assert data['page'] == 2


@pytest.mark.django_db
def test_list_get_pagination_out_of_range(pagination, rf):
    view = pagination['view']
    request = rf.get('?page=10')
    response = view(request)
    decoded = response.content.decode()
    data = json.loads(decoded)
    assert data['has_more'] == False
    assert len(data['items']) == 0
    assert data['items_per_page'] == 100
    assert data['page'] == 10


@pytest.mark.django_db
def test_list_get_pagination_order(pagination, rf):
    view = pagination['view']
    request = rf.get('?order=-id')
    response = view(request)
    decoded = response.content.decode()
    data = json.loads(decoded)
    items = data['items']
    ordered = True
    last_id = 100
    for i in items:
        if last_id < i['id']:
            ordered = False
            break
        last_id = i['id']
    assert ordered


# ~~~~~~~~~~~~~~~~~~~~
# Post
# ~~~~~~~~~~~~~~~~~~~~


@pytest.mark.django_db
def test_list_post_data_property(setup, rf):
    data = {
        'blocks': [],
        'style': {},
    }
    list_view = setup['list']
    request = rf.post(
        'puzzle/api/pages/',
        {
            'name': 'test',
            'data': data
        },
        'application/json'
    )
    request.is_authenticated = True
    response = list_view(request)
    content = json.loads(response.content.decode('utf-8'))
    assert content['data'] == data


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


# ~~~~~~~~~~~~~~~~~~~~
# Put
# ~~~~~~~~~~~~~~~~~~~~


@pytest.mark.django_db
def test_detail_put_data_property(setup, rf):
    detail_view = setup['detail']
    data = {
        'blocks': [],
        'style': {}
    }
    request = rf.put(
        'puzzle/api/pages/1/',
        {
            'data': data
        },
        'application/json'
    )
    request.is_authenticated = True
    response = detail_view(request, 1)
    content = json.loads(response.content.decode('utf-8'))
    print(content)
    assert content['data'] == data


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

# ~~~~~~~~~~~~~~~~~~~~
# Utils
# ~~~~~~~~~~~~~~~~~~~~


@pytest.mark.django_db
def test_base_state_not_authenticated(rf):
    Website.objects.create(
        description='Some description',
        name='Some Site',
    )
    request = rf.get('/first/')
    request.is_authenticated = False
    state = base_state(request)
    print(state)
    assert state == {
        'site': {
            'description': 'Some description',
            'home_page': None,
            'logo': '/pazl/static/img/favicon/favicon-310.png/',
            'name': 'Some Site',
        },
        'pages': [],
        'user': None,
    }


@pytest.mark.django_db
def test_base_state_published_pages(rf):
    Website.objects.create(
        description='Some description',
        name='Some Site',
    )
    page = Page.objects.create(
        name='Some Page',
        description='Some description',
        published=True,
    )
    request = rf.get('/{}/'.format(page.slug))
    request.is_authenticated = False
    state = base_state(request)
    assert state == {
        'site': {
            'description': 'Some description',
            'home_page': None,
            'logo': '/pazl/static/img/favicon/favicon-310.png/',
            'name': 'Some Site',
        },
        'pages': [{
            'description': page.description,
            'id': page.id,
            'name': page.name,
            'parent': None,
            'path': page.slug,
            'published': True,
            'slug': page.slug,
        }],
        'user': None,
    }


@pytest.mark.django_db
def test_base_state_with_home_page(rf):
    page = Page.objects.create(
        name='Some Page',
        description='Some description',
        published=True,
    )
    Website.objects.create(
        description='Some description',
        name='Some Site',
        home_page=page,
    )
    request = rf.get('/{}/'.format(page.slug))
    request.is_authenticated = False
    state = base_state(request)
    assert state['site']['home_page'] == page.id


@pytest.mark.django_db
def test_base_state_authenticated(rf):
    Website.objects.create(
        description='Some description',
        name='Some Site',
    )
    request = rf.get('/first/')
    user = User.objects.create(username='pazl_user')
    request.user = user
    request.is_authenticated = True
    state = base_state(request)
    print(state)
    assert state == {
        'site': {
            'description': 'Some description',
            'home_page': None,
            'logo': '/pazl/static/img/favicon/favicon-310.png/',
            'name': 'Some Site',
        },
        'pages': [],
        'user': {
            'id': user.id,
            'perms': user.role_permissions(),
            'role': user.role,
            'username': user.username,
        },
    }


@pytest.mark.django_db
def test_entry_state(rf):
    Website.objects.create(
        description='Some description',
        name='Some Site',
    )
    model = Model.objects.create(name='some_model')
    entry = Entry.objects.create(
        name='some_entry',
        description='Some description',
        model=model,
        published=True
    )
    request = rf.get('/some_model/{}/{}'.format(entry.id, entry.slug))
    request.is_authenticated = False
    state = entry_state(request, entry)
    assert state == {
        'site': {
            'description': 'Some description',
            'home_page': None,
            'logo': '/pazl/static/img/favicon/favicon-310.png/',
            'name': 'Some Site',
        },
        'page': {
            'blocks': [],
            'description': entry.description,
            'error': False,
            'id': entry.id,
            'image': entry.image,
            'isEntry': True,
            'modelBlock': None,
            'modelId': model.id,
            'name': entry.name,
            'slug': entry.slug,
            'style': {},
        },
        'pages': [],
        'user': None,
    }


@pytest.mark.django_db
def test_page_state(rf):
    Website.objects.create(
        description='Some description',
        name='Some Site',
    )
    page = Page.objects.create(
        name='Some Page',
        description='Some description',
    )
    request = rf.get('/{}/'.format(page.slug))
    request.is_authenticated = False
    state = page_state(request, page)
    assert state == {
        'site': {
            'description': 'Some description',
            'home_page': None,
            'logo': '/pazl/static/img/favicon/favicon-310.png/',
            'name': 'Some Site',
        },
        'page': {
            'blocks': [],
            'description': page.description,
            'error': False,
            'id': page.id,
            'image': page.image,
            'isEntry': False,
            'modelBlock': None,
            'modelId': 0,
            'name': page.name,
            'slug': page.slug,
            'style': {},
        },
        'pages': [],
        'user': None,
    }
