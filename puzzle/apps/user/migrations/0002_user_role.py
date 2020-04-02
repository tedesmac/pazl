# Generated by Django 3.0.2 on 2020-04-02 01:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('admin', 'Admin'), ('editor', 'Editor'), ('owner', 'Owner'), ('user', 'User')], default='user', max_length=8),
        ),
    ]
