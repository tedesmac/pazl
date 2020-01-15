from django.http import JsonResponse
from django.shortcuts import redirect


def login_required(view):
    """Redirects to login view if user is not loged"""
    def wrapper(request, *args, **kwargs):
        if request.is_authenticated:
            return view(request, *args, **kwargs)
        return redirect('login')
    return wrapper


def private(view):
    """Responds with a 403 code (forbidden) if user doesn't have permissions"""
    def make_private(request, *args, **kwargs):
        if request.is_authenticated:
            return view(request, *args, **kwargs)
        return JsonResponse({}, status=403)
    return make_private
