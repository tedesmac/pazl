from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.views.generic import View
import json
from puzzle.utils.decorators import login_required
import puzzle.utils.jwt as jwt


@login_required
def admin(req, *args):
    return render(req, 'admin.html')


class Login(View):

    def get(self, req):
        if req.is_authenticated:
            return redirect('admin')
        return render(req, 'login.html')


class Logout(View):

    def get(self, req):
        req.user = None
        res = redirect('home')
        res.delete_cookie('puzzle_token')
        return res


def root(req):
    if req.is_authenticated:
        return redirect('admin')
    return redirect('login')


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
            res = JsonResponse({
                'token': token,
            })
            res.set_signed_cookie('puzzle_token', token)
            return res
        return JsonResponse({}, status=401)
