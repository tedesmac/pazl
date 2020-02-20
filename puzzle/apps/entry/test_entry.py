from puzzle.apps.entry.models import Entry
from puzzle.apps.model.models import Model
import pytest


@pytest.mark.django_db
def test_entry_build_path():
    model = Model.objects.create(name='test_model')
    entry = Entry.objects.create(model=model, name='test_entry')
    path = entry.build_path()
    assert path == '{}/{}/{}/'.format(model.name, entry.id, entry.name)
