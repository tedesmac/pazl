from rest_framework import serializers
from puzzle.apps.website.models import Website


class WebsiteSerializer(serializers.Serializer):
    description = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=200
    )
    name = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=50
    )

    def update(self, instance, validated_data):
        instance.description = validated_data.get(
            'description',
            instance.description
        )
        instance.name = validated_data.get(
            'name',
            instance.name
        )
        instance.save()
        return instance
