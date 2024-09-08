from django.urls import path
from .views import get_books, create_book, book_detail
from django.urls import path
from .views import RegisterView, LoginView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('books/', get_books, name='get_books'),
    path('books/create/',create_book, name='create_book'),
    path('books/<int:pk>',book_detail,name='book_detail'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

