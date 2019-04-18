from django.db import models
from django.db import connection
import psycopg2
import pprint
from django.http import HttpResponseRedirect

# Create your models here
class Restaurant(models.Model):
    email = models.CharField(max_length = 100)
    password = models.CharField(max_length = 100)
    name = models.CharField(max_length = 100)
    address = models.CharField(max_length = 100)
    city = models.CharField(max_length = 100)
    state = models.CharField(max_length = 100)
    zip_code = models.IntegerField(default=0)
    phone_number = models.IntegerField(default=0)

    def __str__(self):
        return self.name
    def getEmail(self):
        return self.email
    def getName(self):
        return self.name
    def getAddress(self):
        return self.address
    def getphoneNumber(self):
        return self.phone_number

    def setEmail(email):
         self.email = email
    def setName(name):
         self.name = name
    def setAddress(address, state, city, zip_code):
         self.address = address
         self.state = state
         self.city = city
         self.zip_code = zip_code

    def setphoneNumber(phone_umber):
         self.phone_number = phone_number
         

def get_res(email):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM restaurants WHERE email = %s", [email])
    row = cursor.fetchall()
    pprint.pprint(row)
    return row

def forgot_passRes(email, newpass):
    cursor = connection.cursor()
    cursor.execute("UPDATE restaurants SET password = %s WHERE email = %s", [newpass, email])
    return "success"

def mysearch(name):
    cursor = connection.cursor()
    # print('SELECT name FROM restaurants_restaurant WHERE name LIKE %%%s or LIKE %s%%', [name])
    cursor.execute('SELECT name FROM restaurants WHERE name = %s', [name])
    #LIKE %%%s or LIKE
    row = cursor.fetchall()
    pprint.pprint(row)
    return row
