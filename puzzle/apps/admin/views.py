from django.shortcuts import redirect, render


def admin(req):
    return render(req, 'admin.html')


def login(req):
    return render(req, 'login.html')


def logout(req):
    return redirect('home')


def puzzle_root(req):
    return redirect('login')
