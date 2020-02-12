from puzzle.apps.page.models import Page
from puzzle.utils.serializers import BaseSerializer


class PageSerializer(BaseSerializer):
    class Meta:
        model = Page
        fields = [
            'id',
            'data',
            'description',
            'name',
            'parent',
            'published',
            'slug'
        ]
