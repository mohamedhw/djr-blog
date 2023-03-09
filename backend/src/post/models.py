from django.db import models
from django.utils import timezone


class Post(models.Model):
    title = models.CharField(max_length=50)
    body  = models.TextField()
    image = models.ImageField(null=True, upload_to='posts', default='default.jpg')
    date  = models.DateTimeField(default=timezone.now())

    def __str__(self):
        return self.title
