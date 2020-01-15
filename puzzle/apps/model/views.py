from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.generic import View
from puzzle.apps.model.models import Model
from puzzle.apps.model.serializers import ModelSerializer
from puzzle.utils.decorators import private
from rest_framework.parsers import JSONParser


class ModelAPI(View):

    @method_decorator(private)
    def get(self, req):
        models = Model.objects.all()
        serializer = ModelSerializer(models, many=True)
        return JsonResponse(serializer.data, safe=False)
