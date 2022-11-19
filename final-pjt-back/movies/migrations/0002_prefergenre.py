# Generated by Django 3.2.13 on 2022-11-19 01:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
        ('movies', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PreferGenre',
            fields=[
                ('id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='accounts.user')),
                ('adventure', models.IntegerField()),
                ('fantasy', models.IntegerField()),
                ('animation', models.IntegerField()),
                ('drama', models.IntegerField()),
                ('horror', models.IntegerField()),
                ('action', models.IntegerField()),
                ('comedy', models.IntegerField()),
                ('history', models.IntegerField()),
                ('western', models.IntegerField()),
                ('thriller', models.IntegerField()),
                ('crime', models.IntegerField()),
                ('documentary', models.IntegerField()),
                ('sciencefiction', models.IntegerField()),
                ('mystery', models.IntegerField()),
                ('music', models.IntegerField()),
                ('romance', models.IntegerField()),
                ('family', models.IntegerField()),
                ('war', models.IntegerField()),
                ('tvmovie', models.IntegerField()),
            ],
        ),
    ]