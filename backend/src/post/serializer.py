from rest_framework import serializers
from .models import Post, PostComments


class PostSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    class Meta:
        model = Post
        fields = ('id', 'author', 'title', 'body', 'image', 'date', 'author_name', 'author_image')

class CommentSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    class Meta:
        model = PostComments
        fields = ('post', 'author', 'comment', 'date', 'author_username', 'author_image')