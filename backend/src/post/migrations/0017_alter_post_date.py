# Generated by Django 4.1.7 on 2023-03-10 13:38

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0016_alter_post_date_postcomments'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='date',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 10, 13, 38, 2, 907484, tzinfo=datetime.timezone.utc)),
        ),
    ]
