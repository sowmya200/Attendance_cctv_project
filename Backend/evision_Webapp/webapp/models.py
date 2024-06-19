from django.db import models
from django.contrib.auth.models import User

class Signin(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    class Meta:
        db_table = 'admininfo'

        
class NewEmployee(models.Model):
    empId = models.CharField(primary_key=True, max_length=20)
    empName = models.CharField(max_length=100)
    empDesignation = models.CharField(max_length=100)
    empDepartment = models.CharField(max_length=100)
    empJoindate = models.DateField()
    empImg = models.ImageField(upload_to='images/', null=True, blank=True)
    empMobileno = models.CharField(max_length=20)
    empEmail = models.EmailField(default="")
    empAddress = models.TextField()

    class Meta:
        db_table = 'new_emp'

    def __str__(self):
        return self.empName

class OTP(models.Model):
    email = models.EmailField(default='example@gmail.com')  # Provide a default email address
    otp = models.CharField(max_length=6)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"OTP for {self.email}"
