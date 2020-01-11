from django.conf import settings
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.views.generic import View
import json
import jwt
from puzzle.apps.user.models import User


def admin(req):
    return render(req, 'admin.html')


class Login(View):

    def get(self, req):
        if req.user.is_authenticated:
            return redirect('admin')
        return render(req, 'login.html')

    def post(self, req):
        data = json.loads(req.body.decode('utf-8'))
        email = data['email']
        password = data['password']
        token = data['token']
        username = data['username']

        if token:
            payload = jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=['HS256']
            )
            user = User.objects.get(id=payload['user'])
        elif email:
            user = authenticate(req, email=email, password=password)
        else:
            user = authenticate(req, username=username, password=password)

        if user is not None:
            token = jwt.encode(
                {
                    'user': user.id,
                    'expires': 'never'
                },
                settings.SECRET_KEY,
                algorithm='HS256')
            return JsonResponse({
                'token': token.decode('utf-8'),
            })
        return JsonResponse({}, status=401)


class Logout(View):

    def get(self, req):
        return redirect('home')


def puzzle_root(req):
    return redirect('login')
