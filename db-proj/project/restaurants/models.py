from django.db import models
from django.db import connection

# Create your models here
class Restaurant(models.Model):
    email = models.CharField(max_length = 100)
    password = models.CharField(max_length = 100)
    name = models.CharField(max_length = 100)
    address = models.CharField(max_length = 100)
    phoneNumber = models.IntegerField(default=0)
    def __str__(self):
        return self.name
    def getEmail(self):
        return self.email
    def getName(self):
        return self.name
    def getAddress(self):
        return self.address
    def getphoneNumber(self):
        return self.phoneNumber

    def setEmail(email):
         self.email = email
    def setName(name):
         self.name = name
    def setAddress(address):
         self.address = address
    def setphoneNumber(phoneNumber):
         self.phoneNumber = phoneNumber

def loginR_raw_sql_query(**kwargs):
    email = kwargs.get('email')
    password = kwargs.get('password')
    return Music.objects.raw('SELECT * FROM Restaurants WHERE password = %s email = %s', [password, email])

def ChangePasswordR_raw_sql_query(**kwargs):
    name = kwargs.get('email')
    desiredPassowrd = kwargs.get('newPassword')
    cursor = connection.cursor()
    cursor.execute("UPDATE Restaurants SET password = %s WHERE email = %s", [desiredPassowrd, name])

def CreateR_raw_sql_query(**kwargs):
    email = kwargs.get('email')
    password = kwargs.get('password')
    address = kwargs.get('address')
    name = kwargs.get('name')
    phoneNumber = kwargs.get('phoneNumber')
    Music.objects.raw('INSERT INTO Restaurants VALE(%s, %s, %s, %s, %d) ', [email, password, name, address, phoneNumber])


def printall():
	for p in Restaurant.objects.raw('SELECT * FROM Restaurants'):
		print(p)
