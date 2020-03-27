from django.conf import settings
from django.core.files.images import ImageFile
import os
from pathlib import Path


def get_media_path(filename: str, subdir: str=''):
    """
    This function is similar to os.path.join(MEDIA_ROOT, subdir, filename), but
    creates the directories to the path if they don't exist.
    """
    dir_path = os.path.join(
        os.path.abspath(settings.MEDIA_ROOT),
        subdir
    )
    path = Path(dir_path)
    if not path.exists():
        path.mkdir(parents=True, exist_ok=True)
        return os.path.join(dir_path, filename)
    return os.path.join(dir_path, filename)


def handle_file(f):
    """
    Moves f to MEDIA_ROOT/<subdir>/<filename>.<ext>. Where 'ext' is the
    extension of the original file.
    Returns a File with the new file location.
    """
    pass


def handle_image(f, filename: str, subdir: str=''):
    """
    Moves f to MEDIA_ROOT/<subdir>/<filename>.<ext>. Where: 'subdir' is the
    optional sub directory inside MEDIA_ROOT; 'filename' is the new file's name;
    and 'ext' is the extension of the original file.
    Returns a ImageFile with the new file location.
    """
    root, ext = os.path.splitext(f.name)
    filename += ext
    path = get_media_path(filename, subdir)
    with open(path, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)
    image = ImageFile(open(path, 'rb'))
    return image
