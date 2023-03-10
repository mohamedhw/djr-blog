from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title  = models.CharField(max_length=50)
    body   = models.TextField()
    image  = models.ImageField(null=True, upload_to='posts', default='default.jpg')
    date   = models.DateTimeField(default=timezone.now())

    def author_name(self):
        return self.author.username

    def __str__(self):
        return self.author.username



class PostComments(models.Model):
    post    = models.ForeignKey(Post, on_delete=models.CASCADE)
    author  = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    comment = models.TextField()
    date    = models.DateTimeField(default=timezone.now)


    def __str__(self):
        return str(self.author.username)