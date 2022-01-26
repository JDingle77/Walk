# Generated by Django 3.2.9 on 2022-01-25 19:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('maps', '0015_alter_coordinate_route'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coordinate',
            name='route',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='coordinates', to='maps.route'),
        ),
    ]
