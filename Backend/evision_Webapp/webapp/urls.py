# urls.py

from django.urls import path
from . import views  # Import your views module

urlpatterns = [
    path('signin', views.Signin_input, name='Signin_input'),
    path('login', views.login_input, name='login'),
    path('create_emp_details', views.new_emp, name='create_employee'),
    path('get-all-employees/', views.get_all_employees, name='get_all_employees'),
    path('search_employee/<str:empId>',views.search_employee,name='search_employee'),
    path('deleteById/<str:empId>', views.delete_employee, name='delete_employee'),
    path('update-employee/<str:emp_id>', views.update_employee, name='update_employee'),
    path('send-otp/', views.send_otp, name='send_otp'),
    path('verify-otp/', views.verify_otp, name='verify_otp'),
    path('update_password/', views.update_password, name='update_password'),
    path('check-internet/', views.check_internet, name='check_internet'),
]
