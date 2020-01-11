from django.shortcuts import render


def home(req):
    return render(req, 'base.html')


def page(req, path):
    return render(req, 'base.html')
