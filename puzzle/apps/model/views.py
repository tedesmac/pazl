from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.generic import View
import json
from puzzle.apps.model.models import Model
from puzzle.apps.model.serializers import ModelSerializer
from puzzle.utils.decorators import private
from rest_framework.parsers import JSONParser


class ModelAPI(View):

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
            # serializer.save()
            response = serializer.data
            if response['data']:
                response['data'] = json.loads(response['data'])
            return JsonResponse(response)
        return JsonResponse(serializer.errors, status=400)
