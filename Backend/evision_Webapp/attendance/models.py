from django.db import models
from webapp.models import NewEmployee

class Attendance(models.Model):
    person_id = models.ForeignKey(NewEmployee, on_delete=models.CASCADE, to_field='empName', db_column='person_id')
    timestamp = models.DateTimeField()
    image_path = models.ImageField( null=True, blank=True)

    def __str__(self):
        return f'{self.person_id} - {self.timestamp}'

class Intruder(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    image_path = models.ImageField(max_length=255)

    def __str__(self):
        return f'Intruder at {self.timestamp}'