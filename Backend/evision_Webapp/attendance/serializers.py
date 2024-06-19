from rest_framework import serializers
import os
from .models import Attendance,Intruder
from django.conf import settings

class AttendanceSerializer(serializers.ModelSerializer):
    empName = serializers.CharField(source='person.empName', read_only=True)
    image_path = serializers.SerializerMethodField()

    def get_image_path(self, attendance_record):
        images_dir = os.path.join(settings.BASE_DIR, 'evision_Webapp', 'media', 'Attended_faces')
        image_url = attendance_record.image_path.url  # Assuming image_path is the ImageField in your Attendance model
        corrected_image_path = image_url.replace('\\', '/')  # Normalize path separators if needed
        return '/evision_Webapp/media/' + corrected_image_path

    class Meta:
        model = Attendance
        #fields = ('person_id', 'timestamp', 'image_path')
        fields ="__all__"

# class IntruderSerializer(serializers.ModelSerializer):
#     image_url = serializers.SerializerMethodField()

#     class Meta:
#         model = Intruder
#         fields = ['timestamp', 'image_url']

#     def get_image_url(self, obj):
#         request = self.context.get('request')
#         if hasattr(obj.image_path, 'url'): 
#             return request.build_absolute_uri(obj.image_path.url)
#         else:
#             return None

class IntruderSerializer(serializers.ModelSerializer):
    image_path = serializers.SerializerMethodField()

    def get_image_path(self, attendance_record):
        images_dir = os.path.join(settings.BASE_DIR, 'evision_Webapp', 'media', 'unknown_faces')
        image_url = attendance_record.image_path.url  # Assuming image_path is the ImageField in your Attendance model
        corrected_image_path = image_url.replace('\\', '/')  # Normalize path separators if needed
        return '/evision_Webapp/media/' + corrected_image_path

    class Meta:
        model = Intruder
        #fields = ('person_id', 'timestamp', 'image_path')
        fields ="__all__"