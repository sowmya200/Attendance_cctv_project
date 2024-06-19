from django.contrib import admin
from .models import NewEmployee
from .models import Signin,OTP

admin.site.register(NewEmployee)
admin.site.register(Signin)
admin.site.register(OTP)
