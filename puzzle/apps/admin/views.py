from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.views.generic import View
import json
import puzzle.apps.utils.jwt as jwt


def admin(req):
    return render(req, 'admin.html')


class Login(View):

    def get(self, req):
        if req.user.is_authenticated:
            return redirect('admin')
        return render(req, 'login.html')

    def post(self, req):
        data = json.loads(req.body.decode('utf-8'))
        email = data.get('email', '')
        password = data.get('password', '')
        token = data.get('token', '',)
        username = data.get('username', '')

        if token:
            user = jwt.validate(token)
        elif email:
            user = authenticate(req, email=email, password=password)
        else:
            user = authenticate(req, username=username, password=password)

        if user is not None:
            token = jwt.generate(user)
            return JsonResponse({
                'token': token.decode('utf-8'),
            })
        return JsonResponse({}, status=401)


class Logout(View):

    def get(self, req):
        return redirect('home')


def puzzle_root(req):
    return redirect('login')
