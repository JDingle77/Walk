# Generated by Django 3.2.9 on 2021-11-27 05:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('maps', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='route',
            old_name='end_longitude',
            new_name='start_longitude',
        ),
    ]
