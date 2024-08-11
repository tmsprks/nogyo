# Generated by Django 4.2.15 on 2024-08-10 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_userprofile_chain_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='first_name',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='last_name',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='user_type',
            field=models.CharField(choices=[('consumer', 'Consumer'), ('producer', 'Producer'), ('intermediary', 'Intermediary')], default='consumer', max_length=20),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='chain_id',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
