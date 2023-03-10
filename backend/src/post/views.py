from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from .models import Post
from .serializer import PostSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework import permissions, authentication
from rest_framework.decorators import api_view
from rest_framework.views import APIView


class PostDetail(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'pk'

class PostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.AllowAny, )


@method_decorator(csrf_protect, name='dispatch')
class PostCreate(generics.CreateAPIView):
    queryset = Post.objects.all()
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer


@method_decorator(csrf_protect, name='dispatch')
@api_view(['Destroy'])
def post_delete(request, pk, *args, **kwargs):
    obj = Post.objects.get(pk=request.pk)
    try:
        if request.user.username == obj.author_name():
            obj.delete()
            return Response({"success": "post deleted"})
        else:
            return Response({"err": "could not delete!"})
    except(err):
        return Response({"err": "could not delete this post!"})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class PostUpdate(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'pk'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if request.user == instance:
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "mobile number updated successfully"})
            else:
                return Response({"message": "failed", "details": serializer.errors})
        else:
            return Response({"message": "failed"})




