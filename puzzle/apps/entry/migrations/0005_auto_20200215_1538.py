# Generated by Django 3.0.2 on 2020-02-15 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('entry', '0004_auto_20200215_1535'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entry',
            name='name',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]