from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.generic import View
from puzzle.apps.utils.decorators import private
from puzzle.apps.website.models import Website
from puzzle.apps.website.serializers import WebsiteSerializer
from rest_framework.parsers import JSONParser


class SiteAPI(View):

    @method_decorator(private)
    def get(self, req):
        website, _ = Website.objects.get_or_create(id=1)
        return JsonResponse({
            'description': website.description,
            'name': website.name
        })

    @method_decorator(private)
    def put(self, req):
        website, _ = Website.objects.get_or_create(id=1)
        data = JSONParser().parse(req)
        serializer = WebsiteSerializer(website, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({})
        return JsonResponse({}, status=400)
