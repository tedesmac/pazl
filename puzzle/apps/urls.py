from django.urls import path, re_path
import puzzle.apps.admin.views as admin_views
import puzzle.apps.page.views as page_views

urlpatterns = [
    path('puzzle/admin/', admin_views.admin, name="admin"),
    path('', page_views.home, name="home"),
    re_path('^(?P<path>.*)/$', page_views.page, name="page"),
]
