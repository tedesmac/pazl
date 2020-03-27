from rest_framework import serializers
from puzzle.apps.website.models import Website


class WebsiteSerializer(serializers.ModelSerializer):
    logo = serializers.URLField(read_only=True, source="logo_url")

    class Meta:
        model = Website
        fields = ['description', 'home_page', 'logo', 'name',]
