from rest_framework import serializers


class BaseSerializer(serializers.ModelSerializer):
    data = serializers.JSONField(
        required=False,
        source='data_as_json',
    )

    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        request = self.context.get('request', None)
        if request and getattr(request, 'method', None) == 'POST':
            if 'name' in fields:
                fields['name'].required = True
        return fields

    def create(self, validated_data):
        validated_data['data'] = validated_data.get('data_as_json', '{}')
        validated_data.pop('data_as_json', None)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data['data'] = validated_data.get(
            'data_as_json',
            instance.data
        )
        validated_data.pop('data_as_json', None)
        return super().update(instance, validated_data)
