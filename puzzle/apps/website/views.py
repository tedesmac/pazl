from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.generic import View
from puzzle.apps.website.models import Website
from puzzle.apps.website.serializers import WebsiteSerializer
from puzzle.utils.decorators import private
from puzzle.utils.filesystem import handle_image
from puzzle.utils.forms import ImageForm
from rest_framework.parsers import JSONParser


class SiteAPI(View):

    def get(self, req):
        website, _ = Website.objects.get_or_create(id=1)
        serializer = WebsiteSerializer(website)
        return JsonResponse(serializer.data)

    @method_decorator(private)
    def put(self, req):
        website, _ = Website.objects.get_or_create(id=1)
        data = JSONParser().parse(req)
        serializer = WebsiteSerializer(website, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)


class SiteLogoAPI(View):

    def get(self, request):
        website, _ = Website.objects.get_or_create(id=1)
        logo = website.logo_url
        return JsonResponse({'logo': logo})

    @method_decorator(private)
    def post(self, request):
        form = ImageForm(request.POST, request.FILES)
        if form.is_valid():
            f = request.FILES['file']
            image_file = handle_image(f, 'logo', 'site')
            website, _ = Website.objects.get_or_create(id=1)
            website.logo = image_file
            website.save()
            logo = website.logo_url
            return JsonResponse({
                'logo': logo
            })
        return JsonResponse({}, status=400)
