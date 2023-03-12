from django.urls import path
from . import views

urlpatterns = [
    path('api-post-create/', views.PostCreate.as_view()),
    path('api-post/', views.PostList.as_view(),),
    path('api-post/<int:pk>/', views.PostDetail.as_view(),),
    path('api-post-update/<int:pk>/', views.PostUpdate.as_view()),
    path('api-post-delete/<int:pk>/', views.PostDelete.as_view()),
    path('api-add-comment/', views.Comment.as_view()),
    path('api-search/', views.PostSearch.as_view()),
    path('api-comments/<int:pk>/', views.CommentsList.as_view(),)
]