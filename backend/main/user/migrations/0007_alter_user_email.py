# Generated by Django 3.2.9 on 2022-04-16 23:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0006_alter_dog_gender'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(db_index=True, max_length=128, unique=True),
        ),
    ]
