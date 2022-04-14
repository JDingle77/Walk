# Generated by Django 3.2.9 on 2022-04-08 05:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('yelp_id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('yelp_link', models.URLField()),
                ('res_name', models.CharField(max_length=50)),
                ('is_closed', models.BooleanField()),
                ('desc', models.CharField(max_length=50)),
                ('rating', models.DecimalField(decimal_places=1, max_digits=2)),
                ('review_count', models.IntegerField()),
                ('phone', models.CharField(max_length=50)),
                ('address', models.CharField(max_length=100)),
                ('zipcode', models.IntegerField()),
                ('long', models.DecimalField(decimal_places=6, max_digits=9)),
                ('lat', models.DecimalField(decimal_places=6, max_digits=9)),
                ('distance_m', models.DecimalField(decimal_places=6, max_digits=9)),
            ],
        ),
    ]
