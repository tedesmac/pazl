from puzzle.apps.page.models import Page
from puzzle.utils.serializers import BaseSerializer


class PageSerializer(BaseSerializer):
    class Meta:
        model = Page
        fields = [
            'id',
            'data',
            'description',
            'date_created',
            'date_modified',
            'date_published',
            'image',
            'name',
            'path',
            'parent',
            'published',
            'slug',
        ]
        read_only_fields = [
            'date_created',
            'date_modified',
            'date_published',
            'path',
        ]
