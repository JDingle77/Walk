# Generated by Django 3.2.9 on 2021-11-27 05:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Route',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('route_name', models.CharField(max_length=50)),
                ('start_latitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('end_longitude', models.DecimalField(decimal_places=6, max_digits=9)),
            ],
        ),
        migrations.CreateModel(
            name='Poop',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('poo_latitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('poo_longitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('route', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='maps.route')),
            ],
        ),
        migrations.CreateModel(
            name='Pee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pee_latitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('pee_longitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('route', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='maps.route')),
            ],
        ),
        migrations.CreateModel(
            name='Interaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('interaction_latitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('interaction_longitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('route', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='maps.route')),
            ],
        ),
        migrations.CreateModel(
            name='Drink',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('drink_latitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('drink_longitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('route', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='maps.route')),
            ],
        ),
    ]
