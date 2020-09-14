from django.shortcuts import render
import xlrd
from datetime import datetime,timedelta
from .models import PatientInfo

def populate_patients(request):
    """
    function to upload patients data from CSV.
    """

    if request.method=='POST':
        file = request.FILES.get('patients_data')
        excel = xlrd.open_workbook(file_contents=file.read())
        sheet=excel.sheet_by_index(0)

        for i in range(1,sheet.nrows):

            try:
                patient_id = int(float(str(sheet.cell(i,0).value)))
                reported_on = str(sheet.cell(i,1).value)

                reported_date = datetime.fromordinal(datetime(1900, 1, 1).toordinal() + int(float(reported_on)) - 2)

                age = str(sheet.cell(i,3).value)
                gender = str(sheet.cell(i,4).value)
                city = str(sheet.cell(i,5).value)
                district = str(sheet.cell(i,6).value)
                state = str(sheet.cell(i,7).value)
                status = str(sheet.cell(i,8).value)
                notes = str(sheet.cell(i,9).value)

                patient = PatientInfo.objects.create(
                    patient_id=patient_id,
                    reported_on=reported_date,
                    gender=gender,
                    city=city,
                    district=district,
                    state=state,
                    status=status,
                    notes=notes
                )

                if age.strip() != '':
                    patient.age=int(float(age))
                    patient.save()   
            except:
                continue
    
    return render(request, 'upload_data.html')
        
