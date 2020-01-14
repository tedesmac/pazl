from django.shortcuts import redirect


def private(view):
    def make_private(request, *args, **kwargs):
        if request.is_authenticated:
            return view(request, *args, **kwargs)
        return redirect('login')
    return make_private
