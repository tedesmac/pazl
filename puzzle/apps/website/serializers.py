from rest_framework import serializers
from puzzle.apps.website.models import Website


class WebsiteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Website
        fields = ['description', 'home_page', 'name',]
