from django.shortcuts import render


def editor(req):
    return render(req, 'editor.html')
