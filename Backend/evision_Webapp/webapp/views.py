from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json
from .models import Signin,NewEmployee,OTP
from .serializers import SigninSerializer,NewEmployeeSerializer
from django.views.decorators.http import require_POST
from django.views.decorators.http import require_http_methods
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
import random
import string
from django.core.exceptions import ValidationError
from django.conf import settings
from datetime import timedelta
from django.utils import timezone
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
import requests


#@csrf_exempt
@api_view(['POST'])
def Signin_input(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            serializer = SigninSerializer(data=data)
            
            if serializer.is_valid():
                serializer.save()
                
                return JsonResponse({'status': 'success', 'message': 'User created successfully'})
            else:
                return JsonResponse({'status': 'error', 'errors': serializer.errors}, status=400)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
    else:
        return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed'}, status=405)

#@csrf_exempt
@api_view(['POST'])
def login_input(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from the request body
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')
            try:
                user = Signin.objects.get(email=email)
            except Signin.DoesNotExist:
                return JsonResponse({'authenticated': False, 'error': 'User with provided email does not exist'}, status=401)
            
            if user.password == password : 
            
                return JsonResponse({'authenticated': True, 'message': 'Login successful'})
            else:
                return JsonResponse({'authenticated':False, 'error': 'Invalid email or password'}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'error': 'An unexpected error occurred', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


@api_view(['POST'])
def new_emp(request):
    if request.method == 'POST':
        serializer = NewEmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'message': 'New employee created successfully'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
@api_view(['GET'])
def get_all_employees(request):
    if request.method == 'GET':
        # Fetch all NewEmployee objects (i.e., all rows from the new_emp table)
        all_employees = NewEmployee.objects.all()

        # Serialize the queryset using the serializer
        serializer = NewEmployeeSerializer(all_employees, many=True)

        # Return the serialized data as JSON response
        return Response(serializer.data)
    

@api_view(['GET'])
def search_employee(request, empId):
    if request.method=="GET":
        try:
            if empId:
                # Query the database for the employee with the given ID
                employee = NewEmployee.objects.get(empId=empId)
                serializer = NewEmployeeSerializer(employee)
                return JsonResponse(serializer.data)
            else:
                return JsonResponse({'error': 'Please provide an employee ID.'}, status=400)
        except NewEmployee.DoesNotExist:
            return JsonResponse({'error': 'Employee with provided ID does not exist'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

@require_http_methods(["DELETE"])
def delete_employee(request, empId):
    if request.method == 'DELETE':
        try:
            # Query the database for the employee with the given ID
            employee = NewEmployee.objects.get(empId=empId)
            employee.delete()
            return JsonResponse({'status': 'success', 'message': 'Employee deleted successfully'})
        except NewEmployee.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Employee with provided ID does not exist'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)

@api_view(['PUT'])
def update_employee(request, emp_id):
    try:
        employee = NewEmployee.objects.get(empId=emp_id)
    except NewEmployee.DoesNotExist:
        return Response({'error': 'Employee not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = NewEmployeeSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success', 'message': 'Employee updated successfully'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    

@api_view(['POST'])
@csrf_exempt
def send_otp(request):
    try:
        email = request.data.get('email')

        if not '@' in email or '.' not in email:
            raise ValidationError("Invalid email format")

        if not email.endswith('@gmail.com'):
            raise ValidationError("Invalid email domain")

        otp = ''.join(random.choices(string.digits, k=6))
        otp_instance = OTP.objects.create(email=email, otp=otp)

        expiry_time = timezone.now() + timedelta(minutes=5)
        otp_instance.expiry_time = expiry_time
        otp_instance.save()

        # Send OTP to the user's email
        send_mail(
            'Your OTP',
            f'Your OTP is: {otp}',
            settings.EMAIL_HOST,  # Sender's email address
            [email],  # Recipient's email address
            fail_silently=False,
        )

        return JsonResponse({'message': 'OTP sent successfully', 'otp': otp})

    except ValidationError as e:
        return JsonResponse({'error': str(e)}, status=400)
    except Exception as e:
        error_message = f'An error occurred while sending OTP: {str(e)}'
        return JsonResponse({'error': error_message}, status=500)
    
@api_view(['POST'])
@csrf_exempt
def verify_otp(request):
    try:
        email = request.data.get('email')
        otp_entered = request.data.get('otp')

        # Validate email format (you can reuse your validation logic here if needed)
        if not email or not isinstance(email, str) or '@' not in email or '.' not in email:
            raise ValidationError("Invalid email format")

        # Basic email domain validation (customize as needed)
        if not email.endswith('@gmail.com'):
            raise ValidationError("Invalid email domain")

        # Fetch OTP from database for the provided email
        otp_instance = OTP.objects.filter(email=email).order_by('-timestamp').first()

        if not otp_instance:
            raise ValidationError("OTP not found for this email")

        expected_otp = otp_instance.otp

        # Compare entered OTP with expected OTP
        if otp_entered == expected_otp:
            # Optionally, delete the OTP instance after successful verification
            otp_instance.delete()
            return JsonResponse({'message': 'OTP verified successfully'})
        else:
            return JsonResponse({'error': 'Invalid OTP'}, status=400)

    except ValidationError as e:
        return JsonResponse({'error': str(e)}, status=400)
    except Exception as e:
        error_message = f'An error occurred while verifying OTP: {str(e)}'
        return JsonResponse({'error': error_message}, status=500)
    
@api_view(['PUT'])
@permission_classes([AllowAny])  # Allows access without requiring CSRF token
def update_password(request):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            new_password = data.get('new_password')

            serializer = SigninSerializer(data=data)
            
            if not email or not new_password:
                return JsonResponse({'status': 'error', 'message': 'Email and new password are required'}, status=400)
            if len(new_password) < 8:
                return JsonResponse({'status': 'error', 'message': 'New password must be at least 8 characters long'}, status=400)

            try:
                user = Signin.objects.get(email=email)
            except Signin.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'User with this email does not exist'}, status=404)

            user.password = new_password
            user.save()

            return JsonResponse({'status': 'success', 'message':" user.password saved to database"})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    else:
        return JsonResponse({'status': 'error', 'message': 'Only PUT requests are allowed'}, status=405)


def check_internet(request):
    try:
        response = requests.get('http://www.google.com', timeout=5)
        response.raise_for_status()
        return JsonResponse({'status': 'internet connected'})
    except requests.exceptions.RequestException as e:
        return JsonResponse({'status': 'internet disconnected', 'error': str(e)}, status=500)    