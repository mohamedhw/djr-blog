from django.urls import path
from . import views

urlpatterns = [
    path('api-post/', views.PostList.as_view(),),
    path('api-post/<int:pk>/', views.PostDetail.as_view(),)
]