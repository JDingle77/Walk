# Generated by Django 3.2.9 on 2021-11-28 07:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('maps', '0003_alter_route_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='route',
            old_name='id',
            new_name='route_id',
        ),
    ]
