# Generated by Django 3.2.9 on 2022-01-25 19:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('maps', '0014_alter_coordinate_route'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coordinate',
            name='route',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='maps.route'),
        ),
    ]
