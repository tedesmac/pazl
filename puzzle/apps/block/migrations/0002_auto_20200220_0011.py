# Generated by Django 3.0.2 on 2020-02-20 00:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('block', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='block',
            old_name='data',
            new_name='_data',
        ),
    ]
