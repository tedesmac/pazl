# Generated by Django 3.0.2 on 2020-02-15 00:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('page', '0002_auto_20200212_1908'),
    ]

    operations = [
        migrations.AddField(
            model_name='page',
            name='path',
            field=models.CharField(blank=True, max_length=2000, null=True),
        ),
    ]