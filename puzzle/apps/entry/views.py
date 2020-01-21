from puzzle.utils.views import DetailAPIView, ListAPIView
from puzzle.apps.entry.models import Entry
from puzzle.apps.entry.serializers import EntrySerializer


class EntryDetailAPI(DetailAPIView):

    class Meta:
        model = Entry
        serializer = EntrySerializer


class EntryListAPI(ListAPIView):

    class Meta:
        model = Entry
        serializer = EntrySerializer
