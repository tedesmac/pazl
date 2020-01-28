from puzzle.apps.file.models import Image
from rest_framework import serializers


class ImageSerializer(serializers.ModelSerializer):
    url = serializers.URLField(read_only=True)

    class Meta:
        fields = ['id', 'name', 'url']
        model = Image
