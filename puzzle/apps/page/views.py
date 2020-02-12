from django.shortcuts import render
from puzzle.apps.page.models import Page
from puzzle.apps.page.serializers import PageSerializer
from puzzle.utils.views import DetailAPIView, ListAPIView


def home(req):
    return render(req, 'page.html')


def page(req, *args, **kwargs):
    return render(req, 'page.html')


class PageDetailAPI(DetailAPIView):

    class Meta:
        model = Page
        serializer = PageSerializer


class PageListAPI(ListAPIView):

    class Meta:
        model = Page
        serializer = PageSerializer
