# Generated by Django 3.2.9 on 2022-04-07 23:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_dog'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dog',
            name='gender',
            field=models.CharField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Not specified', 'Not specified')], default='Not specified', max_length=15),
        ),
    ]
