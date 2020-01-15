from django.shortcuts import render


def editor(req, *args):
    return render(req, 'editor.html')
