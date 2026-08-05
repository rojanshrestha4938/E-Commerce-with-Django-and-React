from django.contrib import admin
# pyrefly: ignore [missing-import]
from .models import Catagory,Product,Order,OrderItem,User_Profile

# Register your models here.
admin.site.register(Catagory)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(User_Profile)
