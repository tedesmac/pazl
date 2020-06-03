from puzzle.apps.entry.models import Entry
from puzzle.utils.serializers import BaseSerializer


class EntrySerializer(BaseSerializer):

    class Meta:
        model = Entry
        fields = [
            'id',
            'data',
            'description',
            'date_created',
            'date_modified',
            'date_published',
            'image',
            'model',
            'name',
            'published',
            'slug',
        ]
        read_only_fields = [
            'date_created',
            'date_modified',
            'date_published',
        ]
