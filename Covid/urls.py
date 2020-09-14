from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

from .views import GetPatientsInfoView, AddPatientsInfoView, sendMail

from .populate_data import populate_patients

urlpatterns = [
    path('get-info/', GetPatientsInfoView.as_view(), name="GetPatientsInfo"),
    path('add-info/', AddPatientsInfoView.as_view(), name="AddPatientsInfo"),

    path('send-stats-mail/', sendMail.as_view(), name="SendStatsMail"),

    # Upload patients data from csv
    path('upload/patients/AXz123/data/', populate_patients, name="PopulatePatients"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

if not settings.DEBUG:
    urlpatterns += [ path('media/<str:path>/', serve,{'document_root': settings.MEDIA_ROOT}), path('static/<str:path>/', serve,{'document_root': settings.STATIC_ROOT}), ]
