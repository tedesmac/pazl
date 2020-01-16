from puzzle.apps.model.models import Model
from rest_framework import serializers


class ModelSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    data = serializers.JSONField(
        required=False,
        source="data_as_json",
    )
    name = serializers.CharField(
        allow_blank=False,
        max_length=50,
        required=True,
    )

    def create(self, validated_data):
        newData = {
            'data': validated_data.get('data_as_json', '{}'),
            'name': validated_data.get('name', '')
        }
        return Model.objects.create(**newData)

    def update(self, instance, validated_data):
        instance.data = validated_data.get('data_as_json', instance.data)
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance
