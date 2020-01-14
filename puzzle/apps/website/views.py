from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.generic import View
import json
import puzzle.apps.utils.jwt as jwt
from puzzle.apps.website.models import Website
from puzzle.apps.utils.decorators import private


class SiteAPI(View):

    @method_decorator(private)
    def get(self, req):
        website, _ = Website.objects.get_or_create(id=1)
        return JsonResponse({
            'description': website.description,
            'name': website.name
        })

    @method_decorator(private)
    def post(self, req):
        data = json.loads(req.body.decode('utf-8'))
        description = data.get('description', '')
        name = data.get('name', 'Puzzle Site')

        website, _ = Website.objects.get_or_create(id=1)
        website.description = description
        website.name = name
        website.save()

        return JsonResponse({ 'status': 'ok' })
