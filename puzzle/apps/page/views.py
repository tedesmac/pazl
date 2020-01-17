from django.http import JsonResponse
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.generic import View
import json
from puzzle.apps.page.models import Page
from puzzle.apps.page.serializers import PageSerializer
from puzzle.utils.decorators import private
from rest_framework.parsers import JSONParser


def home(req):
    return render(req, 'page.html')


def page(req, *args, **kwargs):
    return render(req, 'page.html')


class PageDetailAPI(View):

    @method_decorator(private)
    def delete(self, request, id):
        pass

    def get(self, request, id):
        try:
            page = Page.objects.get(id=id)
        except Page.DoesNotExist:
            return JsonResponse({}, status=400)
        serializer = PageSerializer(page)
        return JsonResponse(serializer.data)

    @method_decorator(private)
    def put(self, request, id):
        try:
            page = Page.objects.get(id=id)
        except:
            return JsonResponse({}, status=400)
        data = JSONParser().parse(request)
        serializer = PageSerializer(page, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)


class PageListAPI(View):

    def get(self, request):
        pages = Page.objects.all()
        serializer = PageSerializer(pages, many=True)
        return JsonResponse(serializer.data, safe=False)

    @method_decorator(private)
    def post(self, request):
        data = JSONParser().parse(request)
        data['data'] = json.dumps(data.get('data', {}))
        serializer = PageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        print(serializer.errors)
        return JsonResponse(serializer.errors, status=400)
