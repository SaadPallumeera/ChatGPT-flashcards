# Generated by Django 3.2.13 on 2024-08-13 20:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_book_cost'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='cost',
            field=models.DecimalField(decimal_places=2, default=10, max_digits=10),
        ),
    ]
