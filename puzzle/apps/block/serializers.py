from puzzle.apps.block.models import Block
from puzzle.utils.serializers import BaseSerializer


class BlockSerializer(BaseSerializer):

    class Meta:
        model = Block
        fields = [
            'id',
            'data',
            'model',
            'name',
        ]
