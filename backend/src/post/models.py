from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.db.models import Q
from user.models import Profile

class PostManager(models.Manager):

    def search(self, query=None):
        if query is None or query == "":
            self.get_queryset().none()

        lookups = Q(body__icontains=query) | Q(title__icontains=query)
        return self.get_queryset().filter(lookups)

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title  = models.CharField(max_length=50)
    body   = models.TextField()
    image  = models.ImageField(null=True, upload_to='posts', default='default.jpg')
    date   = models.DateTimeField(default=timezone.now)


    objects = PostManager()
    def author_name(self):
        return self.author.username

    def author_image(self):
        profile = Profile.objects.get(user=self.author)
        return profile.image.url
        
    def __str__(self):
        return self.title



class PostComments(models.Model):
    post    = models.ForeignKey(Post, on_delete=models.CASCADE)
    author  = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    comment = models.TextField()
    date    = models.DateTimeField(default=timezone.now)

    def author_username(self):
        return self.author.username

    def author_image(self):
        profile = Profile.objects.get(user=self.author)
        return profile.image.url

    def __str__(self):
        return self.author.username