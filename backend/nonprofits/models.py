from django.db import models
from django.db import connection
import psycopg2
import pprint
from django.http import HttpResponseRedirect

class NonProfit(models.Model):
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

def get_nonp(email):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM nonprofits WHERE email = %s", [email])
    row = cursor.fetchall()
    pprint.pprint(row)
    return row

def loginNon(email, password):
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM nonprofits WHERE password = %s AND email = %s', [password, email])
    row = cursor.fetchall()
    pprint.pprint(row)
    if len(row) == 0:
        return "none found"
    return ["success", row]

def forgot_passNon(email, newpass):
    cursor = connection.cursor()
    cursor.execute("UPDATE nonprofits SET password = %s WHERE email = %s", [newpass, email])
    return "success"

def registerNon(email, password, address, name, phoneNumber, zip_code):
    cursor = connection.cursor()
    cursor.execute('INSERT INTO nonprofits ("email", "password", "name", "address", "phone_number", "zip_code") VALUES(%s, %s, %s, %s, %s, %s) ', [email, password, name, address, phoneNumber, zip_code])
    # row = cursor.fetchall()
    # pprint.pprint(row)
    return [email, password, name, address, phoneNumber, zip_code]

def unsubNon(email):
    cursor = connection.cursor()
    cursor.execute("DELETE FROM nonprofits WHERE email = %s", [email])
    return "success"