from django.urls import include, path, re_path
import puzzle.apps.admin.views as admin_views
import puzzle.apps.editor.views as editor_views
import puzzle.apps.page.views as page_views

api_urlpatterns = [
    path('token', admin_views.Token.as_view()),
]

urlpatterns = [
    path('puzzle/', admin_views.root),
    path('puzzle/admin/', admin_views.admin, name='admin'),
    path('puzzle/api/', include(api_urlpatterns)),
    path('puzzle/editor/', editor_views.editor, name='editor'),
    path('puzzle/login/', admin_views.Login.as_view(), name='login'),
    path('puzzle/logout/', admin_views.Logout.as_view(), name='logout'),
    path('', page_views.home, name='home'),
    re_path('^(?P<path>.*)/$', page_views.page, name='page'),
]
