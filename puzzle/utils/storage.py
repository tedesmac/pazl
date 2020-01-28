from django.core.files.storage import FileSystemStorage
from django.utils.deconstruct import deconstructible


@deconstructible
class PuzzleStorage(FileSystemStorage):

    def get_available_name(self, name, max_length=None):
        return name

    def get_valid_name(self, name):
        return name

    def _save(self, name, content):
        return name
