from django import forms


class FileForm(forms.Form):
    file = forms.FileField()


class ImageForm(forms.Form):
    file = forms.ImageField()
