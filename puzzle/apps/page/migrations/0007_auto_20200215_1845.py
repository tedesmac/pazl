# Generated by Django 3.0.2 on 2020-02-15 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('page', '0006_auto_20200215_1631'),
    ]

    operations = [
        migrations.AlterField(
            model_name='page',
            name='path',
            field=models.CharField(blank=True, max_length=2000, unique=True),
        ),
    ]
