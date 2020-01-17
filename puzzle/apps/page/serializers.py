from puzzle.apps.page.models import Page
from rest_framework import serializers


class PageSerializer(serializers.ModelSerializer):
    data = serializers.JSONField(
        required=True,
        source='data_as_json',
    )

    class Meta:
        model = Page
        fields = ['id', 'data', 'description', 'name', 'parent', 'slug']
