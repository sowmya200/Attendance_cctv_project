# Generated by Django 5.0.1 on 2024-06-14 05:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0008_otp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='newemployee',
            name='empImg',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]
