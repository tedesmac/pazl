from puzzle.apps.block.models import Block
from puzzle.apps.block.serializers import BlockSerializer
from puzzle.utils.views import DetailAPIView, ListAPIView


class BlockDetailAPI(DetailAPIView):

    class Meta:
        model = Block
        serializer = BlockSerializer


class BlockListAPI(ListAPIView):

    class Meta:
        model = Block
        serializer = BlockSerializer
