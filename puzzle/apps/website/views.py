from django.utils.decorators import method_decorator
from puzzle.apps.utils.decorators import private
from puzzle.apps.website.models import Website
from puzzle.apps.website.serializers import WebsiteSerializer
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.views import APIView


class SiteAPI(APIView):

    @method_decorator(private)
    def get(self, req):
        website, _ = Website.objects.get_or_create(id=1)
        return Response({
            'description': website.description,
            'name': website.name
        })

    @method_decorator(private)
    def put(self, req):
        data = JSONParser().parse(req)
        serializer = WebsiteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response()
        return Response(status=HTTP_400_BAD_REQUEST)
