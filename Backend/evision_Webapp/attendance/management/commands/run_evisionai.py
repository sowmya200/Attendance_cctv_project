from django.core.management.base import BaseCommand
from eVisionAI.eVisionAI import eVisionAI 
from django.conf import settings # Adjust the import based on the actual path

class Command(BaseCommand):
    help = 'Run eVisionAI'

    def handle(self, *args, **kwargs):
        images_dir = settings.IMAGES_DIR
        eVisionAI_module = eVisionAI(images_dir)
        eVisionAI_module.start()
