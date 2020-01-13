from django.http import JsonResponse
from django.views.generic import View
import json
import puzzle.apps.utils.jwt as jwt
from puzzle.apps.website.models import Website


class SiteAPI(View):

    def get(self, req):
        website, _ = Website.objects.get_or_create(id=1)
        return JsonResponse({
            'description': website.description,
            'name': website.name
        })

    def post(self, req):
        return JsonResponse({ 'status': 'ok' })
