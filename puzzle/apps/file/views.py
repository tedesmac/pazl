from django.conf import settings
from django.core.files.images import ImageFile
from django.http import JsonResponse
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.generic import View
import json
import os
from pathlib import Path
from puzzle.apps.file.models import Image
from puzzle.apps.file.serializers import ImageSerializer
from puzzle.utils.decorators import private
from puzzle.utils.forms import FileForm, ImageForm
from rest_framework.parsers import MultiPartParser
from uuid import uuid4


def get_media_path(filename: str, subdir: str=''):
    dir_path = os.path.join(
        os.path.abspath(settings.MEDIA_ROOT),
        subdir
    )
    path = Path(dir_path)
    if not path.exists():
        path.mkdir(parents=True, exist_ok=True)
    return os.path.join(dir_path, filename)


def handle_file(f):
    pass


def handle_image(f):
    root, ext = os.path.splitext(f.name)
    filename = '{}{}'.format(uuid4(), ext)
    path = get_media_path(filename, 'img')
    with open(path, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)
    image = ImageFile(open(path, 'rb'))
    return image


class ImageDetailAPI:

    @method_decorator(private)
    def delete(self, request, id):
        pass

    def get(self, request, id):
        pass

    @method_decorator(private)
    def put(self, request, id):
        pass


class ImageListAPI(View):

    def get(self, request):
        instance = Image.objects.all().order_by('-id')
        serializer = ImageSerializer(instance, many=True)
        return JsonResponse(serializer.data, safe=False)

    @method_decorator(private)
    def post(self, request):
        form = ImageForm(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES['file']
            filename = file.name
            image_file = handle_image(request.FILES['file'])
            image = Image.objects.create(image=image_file, name=filename)
            serializer = ImageSerializer(image)
            return JsonResponse(serializer.data)
        return JsonResponse({}, status=400)
