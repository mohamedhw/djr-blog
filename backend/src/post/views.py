from django.shortcuts import render
from rest_framework import generics, mixins
from rest_framework.response import Response
from .models import Post, PostComments
from .serializer import PostSerializer, CommentSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework import permissions, authentication
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.contrib.auth.models import User


class PostDetail(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'pk'

class PostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.AllowAny, )
    lookup_field ="pk"
    def get_queryset(self, *args, **kwargs):
        # pk = kwargs.get("pk")
        query = self.request.GET.get('q')
        if query is not None:
            qs = super().get_queryset(*args, **kwargs)
            qs = Post.objects.search(query)
            # qs = PostSerializer(qs)
            return qs
        else:
            qs = Post.objects.all()
            return qs

            
@method_decorator(csrf_protect, name='dispatch')
class PostCreate(generics.CreateAPIView):
    queryset = Post.objects.all()
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer


# @api_view(['Destroy'])
# def post_delete(request, pk, *args, **kwargs):
#     print(asdas)
#     obj = Post.objects.get(pk=pk)
#     try:
#         if request.user == obj.author:
#             obj.delete()
#             return Response({"success": "post deleted"})
#         else:
#             return Response({"err": "could not delete!"})
#     except(err):
#         return Response({"err": "could not delete this post!"})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class PostDelete(generics.DestroyAPIView):
    queryset = Post.objects.all()
    lookup_field = 'pk'

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user == instance.author:
            instance.delete()
            return Response({"message": "post deleted success"})
        else:
            return Response({"message": "failed"})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class PostUpdate(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'pk'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if request.user == instance.author:
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "post updated success"})
            else:
                return Response({"message": "failed", "details": serializer.errors})
        else:
            return Response({"message": "failed"})



class PostSearch(generics.ListAPIView):
    queryset =Post.objects.all()
    serializer_class= PostSerializer

    def get_queryset(self, *args, **kwargs):
        qs = super().get_queryset(*args, **kwargs)
        query = self.request.GET.get('q')
        qs = Post.objects.search(query)
        # qs = PostSerializer(qs)

        return qs



# @method_decorator(ensure_csrf_cookie, name='dispatch')
# class CommetCreate(APIView):
#     def post(self, request, *args, **kwargs):
#             peint("asdas")
#         # try:
#             # post = Post.objects.get(pk=request.pk)
#             user = self.request.user.username
#             data = self.request.data

#             post = data["post"]
#             post = Post.objects.get()
#             author = user
#             author = User.objects.get(username=author)
#             comment = data["comment"]
#             print(post, author, comment)
#             queryset = PostComments.objects.create(post=post, author=author, comment=comment)
#             ser = CommentSerializer(queryset)
#             ser.save()
            
#             return Response({"success": "added comment"})
#         # except:
#             # return Response({"error": "bad comment"})

# @method_decorator(csrf_protect, name='dispatch')
class Comment(generics.CreateAPIView):
    queryset = Post.objects.all()
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentSerializer
    
class CommentsList(generics.ListAPIView):
    queryset = PostComments.objects.all()
    serializer_class = CommentSerializer
    lookup_field = 'pk'

    def get_queryset(self, *args, **kwargs):
        pk = self.kwargs.get("pk")
        l = []
        comments= PostComments.objects.all()

        c = CommentSerializer(comments)
        for i in comments:
            if pk is not None:
                if i.post.pk == pk:
                    l.append(i)
            else:
                return Response({"error": "problem"})
        
        return l