from django.shortcuts import render


def admin(req):
    return render(req, 'admin.html')
