# Generated by Django 5.0.1 on 2024-04-22 04:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0004_rename_admin_email_signin_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='newemployee',
            name='date_of_birth',
        ),
        migrations.AddField(
            model_name='newemployee',
            name='email',
            field=models.EmailField(default='', max_length=254),
        ),
    ]
