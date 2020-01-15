from rest_framework import serializers
from puzzle.apps.model.models import Model


class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['id', 'data', 'title']
        model = Model
