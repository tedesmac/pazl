from puzzle.apps.model.models import Model
from puzzle.apps.model.serializers import ModelSerializer
from puzzle.utils.views import DetailAPIView, ListAPIView


class ModelDetailAPI(DetailAPIView):

    class Meta:
        model = Model
        serializer = ModelSerializer

class ModelListAPI(ListAPIView):

    class Meta:
        model = Model
        serializer = ModelSerializer
