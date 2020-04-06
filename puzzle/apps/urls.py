from django.conf import settings
from django.urls import include, path, re_path
from django.views.static import serve
import puzzle.apps.admin.views as admin_views
import puzzle.apps.block.views as block_views
import puzzle.apps.editor.views as editor_views
import puzzle.apps.entry.views as entry_views
import puzzle.apps.file.views as file_views
import puzzle.apps.model.views as model_views
import puzzle.apps.page.views as page_views
import puzzle.apps.website.views as site_views
import puzzle.apps.user.views as user_views

api_urlpatterns = [
    path('blocks/', block_views.BlockListAPI.as_view()),
    path('blocks/<int:id>/', block_views.BlockDetailAPI.as_view()),
    path('entries/', entry_views.EntryListAPI.as_view()),
    path('entries/<int:id>/', entry_views.EntryDetailAPI.as_view()),
    path('images/', file_views.ImageListAPI.as_view()),
    path('me/', user_views.me),
    path('models/', model_views.ModelListAPI.as_view()),
    path('models/<int:id>/', model_views.ModelDetailAPI.as_view()),
    path('pages/', page_views.PageListAPI.as_view()),
    path('pages/<int:id>/', page_views.PageDetailAPI.as_view()),
    path('site/', site_views.SiteAPI.as_view()),
    path('site/logo/', site_views.SiteLogoAPI.as_view()),
    path('token/', admin_views.Token.as_view()),
    path('users/', user_views.UserListAPI.as_view()),
    path('users/<int:pk>/', user_views.UserDetailAPI.as_view()),
]

urlpatterns = [
    path('pazl/', admin_views.root),
    re_path('^pazl/admin/(.*)?$', admin_views.admin, name='admin'),
    path('pazl/api/', include(api_urlpatterns)),
    re_path('^pazl/editor/(.*)?$', editor_views.editor, name='editor'),
    re_path(r'^pazl/media/(?P<path>.*)$', serve, {
        'document_root': settings.MEDIA_ROOT,
    }),
    path('pazl/login/', admin_views.Login.as_view(), name='login'),
    path('pazl/logout/', admin_views.Logout.as_view(), name='logout'),
    path('', page_views.home_page),
    re_path('^(?P<path>.*)?/$', page_views.page, name='page'),
]
