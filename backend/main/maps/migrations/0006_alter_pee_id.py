# Generated by Django 3.2.9 on 2021-11-29 03:09

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('maps', '0005_rename_route_id_route_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pee',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
    ]
