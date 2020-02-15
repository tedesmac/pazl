from rest_framework import serializers


class BaseSerializer(serializers.ModelSerializer):
    data = serializers.JSONField(
        required=True,
        source='data_as_json',
    )

    def create(self, validated_data):
        validated_data['data'] = validated_data.get('data_as_json', '{}')
        validated_data.pop('data_as_json', None)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data['data'] = validated_data.get('data_as_json', '{}')
        validated_data.pop('data_as_json', None)
        return super().update(instance, validated_data)
