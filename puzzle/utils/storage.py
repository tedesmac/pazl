from django.core.files import File, ImageFile
from django.core.files.storage import Storage
from django.utils.deconstruc import deconstructible
from os import path
from uuid import uuid4


@deconstructible
class PuzzleStorage(Storage):

    def _open(self, name, mode='rb'):
        print('[Sotrage._open] => {}'.format(name))
        with open(name, mode) as file:
            root, ext = path.splitext(name)
            if ext in ['.jpeg', '.jpg', '.png', '.svg']:
                return ImageFile(file)
            return File(file)

    def _save(self, content):
        root, ext = path.splitext(name)
        head, tail = path.split(root)
        filename = '{}{}'.format(uuid4(), ext.lower())
        print('[Srtorage._save] => {}'.format(filename))
        return path.join(head, filename)

    def url(self, name):
        return '{}{}'.format(settings.MEDIA_URL, name)
