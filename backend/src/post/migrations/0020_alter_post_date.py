# Generated by Django 4.1.7 on 2023-03-12 11:39

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0019_alter_post_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 12, 11, 39, 40, 641525, tzinfo=datetime.timezone.utc)),
        ),
    ]