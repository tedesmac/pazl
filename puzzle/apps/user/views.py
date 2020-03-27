from django.http import JsonResponse
from django.shortcuts import render
from puzzle.apps.user.models import User
from puzzle.apps.user.serializers import UserSerializer
from rest_framework import generics


def me(request):
    user = request.user
    if user is None:
        return JsonResponse({}, status=403)
    serializer = UserSerializer(user)
    return JsonResponse(serializer.data)


class UserDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserListAPI(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
