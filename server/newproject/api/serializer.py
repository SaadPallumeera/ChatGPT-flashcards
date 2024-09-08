from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    release_year = serializers.SerializerMethodField()  # Use SerializerMethodField for computed properties

    class Meta:
        model = Book
        fields = ['id', 'user','bookTitle', 'release_year']

    def get_release_year(self, obj):
        # Use the model's property method to get the release year
        return obj.release_year
