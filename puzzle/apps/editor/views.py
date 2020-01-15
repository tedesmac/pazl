from django.shortcuts import render
from puzzle.utils.decorators import login_required


@login_required
def editor(req, *args):
    return render(req, 'editor.html')
