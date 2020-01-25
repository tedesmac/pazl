from puzzle.apps.file.models import Image
from rest_framework.serializers import ModelSerializer


class ImageSerializer(ModelSerializer):

    class Meta:
        fields = ['id', 'image', 'name']
        model = Image
