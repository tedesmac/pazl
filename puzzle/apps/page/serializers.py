from puzzle.apps.page.models import Page
from puzzle.utils.serializers import BaseSerializer


class PageSerializer(BaseSerializer):
    class Meta:
        model = Page
        fields = [
            'id',
            'data',
            'description',
            'image',
            'name',
            'path',
            'parent',
            'published',
            'slug'
        ]
        read_only_fields = ['path']
