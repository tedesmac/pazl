from rest_framework import serializers


class BaseSerializer(serializers.ModelSerializer):
    data = serializers.JSONField(required=False)

    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        request = self.context.get('request', None)
        if request and getattr(request, 'method', None) == 'POST':
            if 'name' in fields:
                fields['name'].required = True
        return fields
