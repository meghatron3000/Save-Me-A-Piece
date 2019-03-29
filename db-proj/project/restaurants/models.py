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
    # return HttpResponseRedirect("index.html", {"all_restaurants":row})
    pprint.pprint(row)
    print("Column names: {}\n".format(row))


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

def loginR_raw_sql_query(**kwargs):
    email = kwargs.get('email')
    password = kwargs.get('password')
    return Restaurant.objects.raw('SELECT * FROM Restaurants WHERE password = %s email = %s', [password, email])

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
    Restaurant.objects.raw('INSERT INTO Restaurants VALUES(%s, %s, %s, %s, %d) ', [email, password, name, address, phoneNumber])


def printall(self):
	for p in Restaurant.objects.raw('SELECT * FROM Restaurants'):
		print(p)
