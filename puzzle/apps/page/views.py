from django.shortcuts import render


def home(req):
    return render(req, 'page.html')


def page(req, path):
    return render(req, 'page.html')
