from django.http import JsonResponse
from django.shortcuts import redirect


def private(view):
    def make_private(request, *args, **kwargs):
        if request.is_authenticated:
            return view(request, *args, **kwargs)
        return JsonResponse({}, status=403)
    return make_private


def requires_login(view):
    def wrapper(request, *args, **kwargs):
        if request.is_authenticated:
            return view(request, *args, **kwargs)
        return redirect('login')
    return wrapper
