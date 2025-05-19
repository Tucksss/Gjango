from django.urls import path
from .views import  UserCreateAPIView, UserInfoView, UserList
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
urlpatterns = [
    path('users/', UserList.as_view(), name='userlist'),
    # path('users/create/', create_user, name='create-user'),
    # path('user/<int:pk>/', user_detail, name='user_detail'),
    # path('login/', LoginAPIView.as_view(), name='login'),
    path('register/', UserCreateAPIView.as_view(), name='register'),
    path('user-info/', UserInfoView.as_view(), name='user-info'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]