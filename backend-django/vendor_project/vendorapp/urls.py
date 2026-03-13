from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, ProductViewSet
from rest_framework_simplejwt.views import TokenObtainPairView

router = DefaultRouter()
router.register('products', ProductViewSet, basename='products')

urlpatterns = [

    path('register/', RegisterView.as_view()),
    path('login/', TokenObtainPairView.as_view()),

    path('', include(router.urls)),
]
