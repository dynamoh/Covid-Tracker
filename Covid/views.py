from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.permissions import AllowAny, IsAuthenticated

from django.shortcuts import get_object_or_404
from django.http import Http404, FileResponse
from django.db.models import Q

from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
import os
from django.core.mail import EmailMessage

from .models import PatientInfo, statsFile
from .serializers import PatientsSerializer

class GetPatientsInfoView(APIView):
    """
    API to get patientsInfo.
    """

    def post(self, request, *args, **kwargs):
        try:
            status = request.data.get('status')

            patients = PatientInfo.objects.filter(status=status).order_by('reported_on')

            data = PatientsSerializer(patients, many=True).data

            response = {
                'message': 'Success',
                'body': data
            }

            return Response(response, status=HTTP_200_OK)

        except Exception as e:
            response = {
                'message': 'failed',
                'error' : str(e),
            }

            return Response(response, status=HTTP_400_BAD_REQUEST)

class AddPatientsInfoView(APIView):
    """
    API to add patientsInfo.
    """

    def post(self, request, *args, **kwargs):
        try:
            patient_id = request.data.get('patient_id')
            reported_on = request.data.get('reported_on')
            age = request.data.get('age')
            gender = request.data.get('gender')
            city = request.data.get('city')
            district = request.data.get('district')
            state = request.data.get('state')
            status = request.data.get('status')
            notes = request.data.get('notes')

            PatientInfo.objects.create(
                patient_id=patient_id,
                reported_on=reported_on,
                age=age,
                gender=gender,
                city=city,
                district=district,
                state=state,
                status=status,
                notes=notes
            )

            response = {
                'message': 'Success',
                'body': []
            }

            return Response(response, status=HTTP_200_OK)
            
        except Exception as e:
            response = {
                'message': 'failed',
                'error' : str(e),
            }

            return Response(response, status=HTTP_400_BAD_REQUEST)

class sendMail(APIView):
    """
    Send graph on user email.
    """

    def post(self, request, *args, **kwargs):

        email = request.data.get('email')
        file_pdf = statsFile.objects.all().first().file

        print(email)
        current_site = get_current_site(request)

        mail_subject = '[noreply] Thank you for subscribing at TRIIII'
        msg = 'Thank you for Visiting the site.'

        message = render_to_string('deceased_stats.html', {
            'domain': current_site.domain,
            'msg':msg,
        })
        
        to_email = email
        email = EmailMessage(
                    mail_subject, message, to=[to_email]
        )
    
        try:
            email.attach('deceased_stats.pdf', file_pdf.read(), 'application/pdf')
        except Exception as e:
            print(e)
        
        email.send()

        return Response({'message':'success', 'body':[]}, status=HTTP_200_OK)