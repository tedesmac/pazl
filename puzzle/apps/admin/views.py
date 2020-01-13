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
class Logout(View):

    def get(self, req):
        return redirect('home')


def root(req):
    return render(req, 'root.html')


class Token(View):

    def post(self, req):
        data = json.loads(req.body.decode('utf-8'))
        email = data.get('email', '')
        password = data.get('password', '')
        token = data.get('token', '',)
        username = data.get('username', '')

        if email:
            user = authenticate(req, email=email, password=password)
        elif username:
            user = authenticate(req, username=username, password=password)
        elif token:
            user = jwt.validate(token)
        else:
            user = None

        if user is not None:
            token = jwt.generate(user)
            return JsonResponse({
                'token': token.decode('utf-8'),
            })
        return JsonResponse({}, status=401)
