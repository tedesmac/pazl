from django.http import JsonResponse
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.generic import View
import json
from puzzle.apps.file.models import Image
from puzzle.apps.file.serializers import ImageSerializer
from puzzle.utils.decorators import private
from puzzle.utils.filesystem import handle_file, handle_image
from puzzle.utils.forms import FileForm, ImageForm
from uuid import uuid4


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
        instance = Image.objects.all().order_by('id')
        serializer = ImageSerializer(instance, many=True)
        return JsonResponse(serializer.data, safe=False)

    @method_decorator(private)
    def post(self, request):
        form = ImageForm(request.POST, request.FILES)
        if form.is_valid():
            f = request.FILES['file']
            filename = f.name
            image_file = handle_image(f, str(uuid4()), 'img')
            image = Image.objects.create(image=image_file, name=filename)
            serializer = ImageSerializer(image)
            return JsonResponse(serializer.data)
        return JsonResponse({}, status=400)
