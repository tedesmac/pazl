# Generated by Django 3.0.2 on 2020-01-14 19:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0002_auto_20200113_2254'),
    ]

    operations = [
        migrations.AddField(
            model_name='website',
            name='logo',
            field=models.ImageField(blank=True, null=True, upload_to='site'),
        ),
    ]
