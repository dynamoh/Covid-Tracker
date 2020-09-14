from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.sites.shortcuts import get_current_site
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse,Http404

from .models import PatientInfo

class PatientsSerializer(serializers.ModelSerializer):
    """
    serializer to convert patients data
    into JSON format
    """

    class Meta:
        model = PatientInfo
        fields = ['patient_id', 'reported_on', 'city', 'district', 'state', 'gender', 'status', 'age', 'notes']
