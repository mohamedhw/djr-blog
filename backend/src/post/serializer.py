from rest_framework import serializers
from .models import Post, PostComments


class PostSerializer(serializers.ModelSerializer):
    
    date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    class Meta:
        model = Post
        fields = ('id', 'author', 'title', 'body', 'image', 'date', 'author_name', 'author_image')

class CommentSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    class Meta:
        model = PostComments
        fields = ('post', 'author', 'comment', 'date', 'author_username', 'author_image')