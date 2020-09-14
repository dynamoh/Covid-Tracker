from django.urls import path, include
from .views import GetPatientsInfoView, AddPatientsInfoView, sendMail

from .populate_data import populate_patients

urlpatterns = [
    path('get-info/', GetPatientsInfoView.as_view(), name="GetPatientsInfo"),
    path('add-info/', AddPatientsInfoView.as_view(), name="AddPatientsInfo"),

    path('send-stats-mail/', sendMail.as_view(), name="SendStatsMail"),

    # Upload patients data from csv
    path('upload/patients/AXz123/data/', populate_patients, name="PopulatePatients"),
]