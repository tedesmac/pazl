from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.generic import View
import json
from puzzle.utils.decorators import private
from rest_framework.parsers import JSONParser


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
            serializer.save()
            return JsonResponse(serializer.data)

        return JsonResponse(serializer.errors, status=400)


class ListAPIView(BaseAPIView):

    def get(self, request):
        instances = self.model.objects.all()
        serializer = self.get_serializer(instances, many=True)
        return JsonResponse(serializer.data, safe=False)

    @method_decorator(private)
    def post(self, request):
        data = JSONParser().parse(request)
        data['data'] = json.dumps(data.get('data', {}))
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
