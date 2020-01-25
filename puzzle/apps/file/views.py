from django.http import JsonResponse
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.generic import View
import json
from puzzle.apps.file.models import Image
from puzzle.apps.file.serializers import ImageSerializer
from puzzle.utils.decorators import private
from rest_framework.parsers import JSONParser


class ImageDetailAPI:
    pass


class ImageListAPI(View):

    def get(self, request):
        instance = Image.objects.all()
        serializer = ImageSerializer(instance, many=True)
        return JsonResponse(serializer.data, safe=False)

    @method_decorator(private)
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = ImageSerializer(data=data)
        if serializer.is_valid():
            return JsonResponse(serializer.data)
        return JsonResponse({}, status=400)
