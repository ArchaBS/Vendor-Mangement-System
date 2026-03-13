from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    vendor = models.ForeignKey(User, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.FloatField()
    quantity = models.IntegerField()
    image_url = models.URLField(max_length=500, blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product_name