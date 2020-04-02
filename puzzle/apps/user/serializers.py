from puzzle.apps.user.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    perms = serializers.JSONField(
        read_only=True,
        source='role_permissions'
    )

    class Meta:
        model = User
        fields = ['id', 'perms', 'role', 'username']
