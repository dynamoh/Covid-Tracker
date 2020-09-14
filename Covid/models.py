from django.db import models

class PatientInfo(models.Model):
    """
    Table to store information of 
    Corona patients (Covid - 19)
    """

    patient_id = models.IntegerField()
    reported_on = models.DateField()
    age = models.IntegerField(null=True, blank=True)
    gender = models.CharField(max_length=12)
    city = models.CharField(max_length=200)
    district = models.CharField(max_length=400)
    state = models.CharField(max_length=400)
    status = models.CharField(max_length=40)
    notes = models.TextField()

    def __str__(self):
        return str(self.patient_id)

class statsFile(models.Model):
    file = models.FileField()