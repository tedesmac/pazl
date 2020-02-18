from puzzle.apps.block.models import Block
from puzzle.apps.model.models import Model
from puzzle.apps.model.serializers import ModelSerializer
import pytest


@pytest.mark.django_db
def test_no_block():
    model = Model.objects.create()
    assert model.block is None


@pytest.mark.django_db
def test_set_block():
    block = Block.objects.create()
    model = Model.objects.create()
    model.block = block
    assert model.block == block.id


@pytest.mark.django_db
def test_serializer():
    block = Block.objects.create()
    block2 = Block.objects.create()
    model = Model.objects.create()
    model.block = block
    serializer = ModelSerializer(model, data={
        'id': 1,
        'block': block2.id,
    })
    assert serializer.is_valid()
    serializer.save()
    assert model.block == block2.id


@pytest.mark.django_db
def test_serializer_null_block():
    block = Block.objects.create()
    model = Model.objects.create()
    model.block = block
    serializer = ModelSerializer(model, data={
        'id': 1,
        'block': None,
    })
    assert serializer.is_valid()
    serializer.save()
    assert model.block == None
