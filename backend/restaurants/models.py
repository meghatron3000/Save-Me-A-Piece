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

class Dishes(models.Model):
    restuarant = models.CharField(max_length = 100)
    name = models.CharField(max_length = 100)
    price = models.CharField(max_length = 100)
    listTime = listTime.CharField(max_length = 100)
    def __str__(self):
        return self.name
    def getRestuarant(self):
        return self.restuarant
    def getName(self):
        return self.name
    def getPrice(self):
        return self.address
    def getlistTime(self):
        return self.listTime    



    def setRestuarant(restuarant):
         self.restuarant = restuarant
    def setName(name):
         self.name = name
    def setPrice(price):
         self.price = price
    def setlistTime(listTime):
         self.listTime = listTime


# def main_rest(self):
#     conn_string = "host='localhost' dbname='piece_db' user='db_user' password='db_password'"

#     column_names = []
#     data_rows = []

#     with psycopg2.connect(conn_string) as connection:
#         with connection.cursor() as cursor:
#             cursor.execute("SELECT * FROM restaurants_restaurant")
#             column_names = [desc[0] for desc in cursor.description]
#             for row in cursor:
#                 data_rows.append(row)
#                 records = cursor.fetchall()

#                 # print out the records using pretty print
#                 # note that the NAMES of the columns are not shown, instead just indexes.
#                 # for most people this isn't very useful so we'll show you how to return
#                 # columns as a dictionary (hash) in the next example.
#                 pprint.pprint(records)
#                 print (type(records))

#     print("Column names: {}\n".format(column_names))


def my_custom_sql():
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM restaurants_restaurant")
    row = cursor.fetchall()
    pprint.pprint(row)
    return row

def loginR_raw_sql_query(email, password):
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM restaurants_restaurant WHERE password = %s AND email = %s', [password, email])
    row = cursor.fetchall()
    pprint.pprint(row)
    if len(row) == 0:
        return "none found"
    return ["success", row]

def forgot_pass(email, newpass):
    cursor = connection.cursor()
    cursor.execute("UPDATE restaurants_restaurant SET password = %s WHERE email = %s", [newpass, email])
    return "success"

def register(email, password, address, name, phoneNumber):
    cursor = connection.cursor()
    cursor.execute('INSERT INTO restaurants_restaurant ("email", "password", "name", "address", "phoneNumber") VALUES(%s, %s, %s, %s, %s) ', [email, password, name, address, phoneNumber])
    # row = cursor.fetchall()
    # pprint.pprint(row)
    return [email, password, name, address, phoneNumber]

def unsub(email):
    cursor = connection.cursor()
    cursor.execute("DELETE FROM restaurants_restaurant WHERE email = %s", [email])
    return "success"

def mysearch(name):
    cursor = connection.cursor()
    # print('SELECT name FROM restaurants_restaurant WHERE name LIKE %%%s or LIKE %s%%', [name])
    cursor.execute('SELECT name FROM restaurants_restaurant WHERE name = %s', [name])
    #LIKE %%%s or LIKE
    row = cursor.fetchall()
    pprint.pprint(row)
    return row


# def my_sql(self):
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM restaurants_restaurant")
#     row = cursor.fetchall()
#     pprint.pprint(row)
#     print("Column names: {}\n".format(row))


# def GetRestaurants_raw_sql_query(self):
#     conn_string = "host='localhost' dbname='piece_db' user='db_user' password='db_password'"

#     column_names = []
#     data_rows = []

#     with psycopg2.connect(conn_string) as connection:
#         with connection.cursor() as cursor:
#             cursor.execute('SELECT * FROM Restaurants')
#             column_names = [desc[0] for desc in cursor.description]
#             for row in cursor:
#                 data_rows.append(row)
#                 records = cursor.fetchall()

#                 # print out the records using pretty print
#                 # note that the NAMES of the columns are not shown, instead just indexes.
#                 # for most people this isn't very useful so we'll show you how to return
#                 # columns as a dictionary (hash) in the next example.
#                 pprint.pprint(records)
#                 print (type(records))
#     print("Column names: {}\n".format(column_names))



# def printall(self):
# 	for p in Restaurant.objects.raw('SELECT * FROM Restaurants'):
# 		print(p)
