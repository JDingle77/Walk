# Generated by Django 3.2.9 on 2021-11-28 07:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('maps', '0004_rename_id_route_route_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='route',
            old_name='route_id',
            new_name='id',
        ),
    ]
