import json
from django.shortcuts import render
from django.conf import settings
import cv2,os,time,datetime,threading
from django.http import JsonResponse,StreamingHttpResponse
from grpc import Status
from attendance.models import Intruder
from .models import Attendance,Intruder
from .serializers import AttendanceSerializer,IntruderSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import get_date_time_from_timestamp
from rest_framework import status
from collections import defaultdict

class VideoCamera:
    def __init__(self):
        self.video = cv2.VideoCapture(0)
        self.lock = threading.Lock()

    def __del__(self):
        self.video.release()

    def get_frame(self):
        with self.lock:
            ret, frame = self.video.read()
            if not ret:
                return None
            ret, jpeg = cv2.imencode('.jpg', frame)
            return jpeg.tobytes()

def gen(camera):
    while True:
        frame = camera.get_frame()
        if frame is not None:
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
        time.sleep(1/30)  # Maintain a frame rate of about 30 FPS

def video_feed(request):
    return StreamingHttpResponse(gen(VideoCamera()),
                                 content_type='multipart/x-mixed-replace; boundary=frame')

def home(request):
    return render(request, 'attendance/index.html')


def upload_attendance(request):
    # Your logic for handling the attendance upload
    return JsonResponse({'message': 'Attendance uploaded successfully'})
def upload_intruder(request):
    # Your logic for handling the upload of intruder data
    return JsonResponse({'message': 'Intruder data uploaded successfully'})

def get_attendance(request):
    # Your logic for retrieving attendance data
    # For example, querying the database for attendance records
    attendance_data = {'example_key': 'example_value'}  # Replace this with your actual data
    return JsonResponse(attendance_data)


# def attendance_report(request):
#     attendance_data = []
#     images_dir = os.path.join(settings.BASE_DIR, 'attendanceSystem', 'eVisionAI', 'Attended_faces')
    
#     for attendance_record in Attendance.objects.all():
#         # Replace backslashes with forward slashes in the image path
#         corrected_image_path = attendance_record.image_path.replace('\\', '/')
        
#         # Build the image path
#         image_path = os.path.join(images_dir, corrected_image_path)
#         image_name = os.path.basename(image_path)
#         name = os.path.splitext(image_name)[0]
        
#         # Create the corrected URL for the image
#         media_image_url = '/attendanceSystem/eVisionAI/' + corrected_image_path
#         attendance_data.append({'name': name, 'timestamp': attendance_record.timestamp, 'image_path': media_image_url})
    
#     return render(request, 'attendance/attendance_report.html', {'attendance_data': attendance_data})

@api_view(['GET'])
def attendance_report(request):
    # Fetch unique person IDs that have attendance records
    unique_person_ids = Attendance.objects.values_list('person_id', flat=True).distinct()
    
    serialized_data = []
    
    # Fetch all attendance records for each unique person ID and serialize them
    for person_id in unique_person_ids:
        attendance_records = Attendance.objects.filter(person_id=person_id)
        
        if attendance_records.exists():  # Check if there are any records for this person ID
            serializer = AttendanceSerializer(attendance_records, many=True)
            serialized_data.extend(serializer.data)
    
    return Response(serialized_data)


# def intruder_report(request):
#     intruder_data = []
#     for intruder_record in Intruder.objects.all():
#         media_image_url = intruder_record.image_path.replace(os.path.join('eVisionAI', ''), '')
#         intruder_data.append({'timestamp': intruder_record.timestamp, 'image_path': media_image_url})

#     return render(request, 'attendance/intruder_report.html', {'intruder_data': intruder_data})

# @api_view(['GET'])
# def intruder_report(request):
#     intruder_records = Intruder.objects.all()
#     serializer = IntruderSerializer(intruder_records, many=True, context={'request': request})
#     return Response(serializer.data)

@api_view(['GET'])
def intruder_report(request):
    # Get all intruder records
    intruder_records = Intruder.objects.all()
    
    serialized_data = []
    media_base_url = request.build_absolute_uri(settings.MEDIA_URL)
    
    for intruder_record in intruder_records:
        serializer = IntruderSerializer(intruder_record)
        data = serializer.data
        
        image_filename = os.path.basename(intruder_record.image_path.name)
        media_image_url = os.path.join(media_base_url, 'intruder', image_filename)
        data['image_path'] = media_image_url
        
        serialized_data.append(data)
    
    return Response(serialized_data)

    
@api_view(['GET'])
def get_attendance_ByID(request, person_id):
    
    attendance_records = Attendance.objects.filter(person_id=person_id).order_by('-id')
    
    if attendance_records.exists():
        serializer = AttendanceSerializer(attendance_records, many=True)
        
        date_time_dict = defaultdict(list)
        for entry in serializer.data:
            date_str, time_str = get_date_time_from_timestamp(entry['timestamp'])
            date_time_dict[date_str].append(time_str)
        
        # Get the earliest time for each date
        unique_dates_with_earliest_times = {date: min(times) for date, times in date_time_dict.items()}
        
        # Modify the serializer data
        modified_data = []
        for entry in serializer.data:
            date_str, time_str = get_date_time_from_timestamp(entry['timestamp'])
            if time_str == unique_dates_with_earliest_times[date_str]:
                entry['date'] = date_str
                entry['time'] = time_str
                del entry['timestamp']
                del entry['person_id']
                del entry['image_path']
                del entry['id']  # Assuming 'id' is not needed in the final output
                modified_data.append(entry)
                unique_dates_with_earliest_times.pop(date_str)  # Ensure only one entry per date is added

        response_data = {
            'records': modified_data
        }
        
        return Response(response_data)
    else:
        return Response({'message': f'No attendance records found for person_id {person_id}'}, status=404)   