# Generated by Django 3.0.2 on 2020-02-20 00:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('model', '0005_modelblock'),
    ]

    operations = [
        migrations.RenameField(
            model_name='model',
            old_name='data',
            new_name='_data',
        ),
    ]
