from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.generic import View
import json
from puzzle.utils.decorators import private
import re
from rest_framework.parsers import JSONParser


re_number = re.compile(r'^\d+(\.\d*)?$')


class BaseAPIView(View):

    class Meta:
        model = None
        serializer = None

    def __init__(self):
        meta = self.Meta()
        if meta.model is None:
            raise Exception('model is not set')
        if meta.serializer is None:
            raise Exception('serializer is not set')
        self.model = meta.model
        self.serializer = meta.serializer

    def get_serializer(self, *args, **kwargs):
        kwargs['context'] = {'request': self.request}
        return self.serializer(*args, **kwargs)

    def setup(self, request, *args, **kwargs):
        self.request = request
        super().setup(request, *args, **kwargs)


class DetailAPIView(BaseAPIView):

    @method_decorator(private)
    def delete(self, request, id):
        try:
            instance = self.model.objects.get(id=id)
        except self.model.DoesNotExist:
            return JsonResponse(
                {
                    'error': 'Object does not exists'
                },
                status=404
            )
        instance.delete()
        return JsonResponse({})

    def get(self, request, id):
        try:
            instance = self.model.objects.get(id=id)
        except self.model.DoesNotExist:
            return JsonResponse(
                {
                    'error': 'Object does not exists'
                },
                status=404
            )

        serializer = self.get_serializer(instance)
        return JsonResponse(serializer.data)

    @method_decorator(private)
    def put(self, request, id):
        try:
            instance = self.model.objects.get(id=id)
        except self.model.DoesNotExist:
            return JsonResponse(
                {
                    'error': 'Object does not exists'
                },
                status=404
            )

        data = JSONParser().parse(request)
        serializer = self.get_serializer(instance, data=data)

        if serializer.is_valid():
            try:
                serializer.save()
                return JsonResponse(serializer.data)
            except:
                return JsonResponse({
                    'path': 'Path must be unique'
                }, status=400)

        return JsonResponse(serializer.errors, status=400)


class ListAPIView(BaseAPIView):

    def get(self, request):
        query = {}
        fields = self.serializer.Meta.fields

        for f in fields:
            if f == 'data':
                continue
            if f in request.GET:
                value = request.GET[f]
                if isinstance(value, list) and len(value) == 1:
                    value = value[0]
                if re_number.match(value):
                    value = int(value)
                query[f] = value

        instances = self.model.objects.all().filter(**query)
        serializer = self.get_serializer(instances, many=True)
        return JsonResponse(serializer.data, safe=False)

    @method_decorator(private)
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            try:
                serializer.save()
                return JsonResponse(serializer.data)
            except:
                return JsonResponse(
                    {
                        "path": "Path in not unique"
                    },
                    status=400
                )
        return JsonResponse(serializer.errors, status=400)
