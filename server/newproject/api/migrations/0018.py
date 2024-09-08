from django.db import migrations

def set_default_user(apps, schema_editor):
    User = apps.get_model('auth', 'User')
    Book = apps.get_model('api', 'Book')
    default_user = User.objects.first()  # Adjust this line as needed

    if default_user is not None:
        for book in Book.objects.all():
            book.user = default_user
            book.save()

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_auto_20240815_1931'),  # Replace with the last migration file before this one
    ]

    operations = [
        migrations.RunPython(set_default_user),
    ]
