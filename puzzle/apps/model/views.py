from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.generic import View
import json
from puzzle.apps.model.models import Model
from puzzle.apps.model.serializers import ModelSerializer
from puzzle.utils.decorators import private
from rest_framework.parsers import JSONParser


class ModelDetailAPI(View):

    @method_decorator(private)
    def delete(self, request, id):
        pass

    @method_decorator(private)
    def get(self, request, id):
        try:
            model = Model.objects.get(id=id)
        except Model.DoesNotExist:
            model = None
        if model:
            serializer = ModelSerializer(model)
            return JsonResponse(serializer.data)
        return JsonResponse({}, status=400)

    @method_decorator(private)
    def put(self, request, id):
        try:
            model = Model.objects.get(id=id)
        except Model.DoesNotExist:
            return JsonResponse({}, status=404)
        data = JSONParser().parse(request)
        serializer = ModelSerializer(model, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)


class ModelListAPI(View):

    @method_decorator(private)
    def get(self, request):
        models = Model.objects.all()
        serializer = ModelSerializer(models, many=True)
        return JsonResponse(serializer.data, safe=False)

    @method_decorator(private)
    def post(self, request, *args, **kwargs):
        data = JSONParser().parse(request)
        data['data'] = json.dumps(data.get('data', {}))
        serializer = ModelSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
