from django.contrib import admin
from .models import PatientInfo, statsFile

@admin.register(PatientInfo)
class PatientInfoAdmin(admin.ModelAdmin):
    list_display = ('patient_id', 'reported_on', 'age', 'gender', 'status', 'city', 'district')
    list_filter = ('gender', 'status')
    
    search_fields = ('patient_id',  'city', 'district')
    ordering = ('reported_on',)
    filter_horizontal = ()

admin.site.register(statsFile)

admin.site.site_header = 'Covid Patients Tracker (CPT)'
admin.site.site_title = 'CPT Admin Portal'
admin.site.index_title = 'Welome to CPT Administration'