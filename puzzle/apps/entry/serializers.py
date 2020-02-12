from puzzle.apps.entry.models import Entry
from puzzle.utils.serializers import BaseSerializer


class EntrySerializer(BaseSerializer):

    class Meta:
        model = Entry
        fields = [
            'id',
            'data',
            'description',
            'name',
            'parent',
            'published',
            'slug'
        ]
