from puzzle.apps.model.models import Model
from puzzle.utils.serializers import BaseSerializer
from rest_framework import serializers


class ModelSerializer(BaseSerializer):
    block = serializers.IntegerField(allow_null=True, required=False)

    class Meta:
        model = Model
        fields = [
            'id',
            'block',
            'data',
            'name',
        ]
