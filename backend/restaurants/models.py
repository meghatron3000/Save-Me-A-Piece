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
    listTime = models.CharField(max_length = 100)
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
    cursor.execute("SELECT * FROM restaurants")
    row = cursor.fetchall()
    pprint.pprint(row)
    return row

def get_res(name):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM restaurants WHERE name = %s", [name])
    row = cursor.fetchall()
    pprint.pprint(row)
    return row

def get_nonp(name):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM nonprofits WHERE name = %s", [name])
    row = cursor.fetchall()
    pprint.pprint(row)
    return row

def get_dishes(restuarant):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM dishes WHERE restuarant = %s", [restuarant])
    row = cursor.fetchall()
    pprint.pprint(row)
    return row

def loginRes(email, password):
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM restaurants WHERE password = %s AND email = %s', [password, email])
    row = cursor.fetchall()
    pprint.pprint(row)
    if len(row) == 0:
        return "none found"
    return ["success", row]

def loginNon(email, password):
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM nonprofits WHERE password = %s AND email = %s', [password, email])
    row = cursor.fetchall()
    pprint.pprint(row)
    if len(row) == 0:
        return "none found"
    return ["success", row]

def forgot_passRes(email, newpass):
    cursor = connection.cursor()
    cursor.execute("UPDATE restaurants SET password = %s WHERE email = %s", [table, newpass, email])
    return "success"

def forgot_passNon(email, newpass):
    cursor = connection.cursor()
    cursor.execute("UPDATE nonprofits SET password = %s WHERE email = %s", [table, newpass, email])
    return "success"

def registerNon(email, password, address, name, phoneNumber, table):
    cursor = connection.cursor()
    cursor.execute('INSERT INTO nonprofits ("email", "password", "name", "address", "phoneNumber") VALUES(%s, %s, %s, %s, %s) ', [table, email, password, name, address, phoneNumber])
    # row = cursor.fetchall()
    # pprint.pprint(row)
    return [email, password, name, address, phoneNumber]

def registerRes(email, password, address, name, phoneNumber, table):
    cursor = connection.cursor()
    cursor.execute('INSERT INTO restaurants ("email", "password", "name", "address", "phoneNumber") VALUES(%s, %s, %s, %s, %s) ', [table, email, password, name, address, phoneNumber])
    # row = cursor.fetchall()
    # pprint.pprint(row)
    return [email, password, name, address, phoneNumber]

def register_dish(restuarant,name,price,listTime, table):
    cursor = connection.cursor()
    cursor.execute('INSERT INTO dishes ("restuarant", "name", "price", "listTime") VALUES(%s, %s, %s, %s, %s) ', [table, restuarant, name, price, listTime])
    # row = cursor.fetchall()
    # pprint.pprint(row)
    return [email, password, name, address, phoneNumber]

def unsubRes(email, table):
    cursor = connection.cursor()
    cursor.execute("DELETE FROM restaurants WHERE email = %s", [table, email])
    return "success"

def unsubNon(email, table):
    cursor = connection.cursor()
    cursor.execute("DELETE FROM nonprofits WHERE email = %s", [table, email])
    return "success"

def delete_dish(name, table):
    cursor = connection.cursor()
    cursor.execute("DELETE FROM dishes WHERE name = %s", [table, name])
    return "success"

def mysearch(name, table):
    cursor = connection.cursor()
    # print('SELECT name FROM restaurants_restaurant WHERE name LIKE %%%s or LIKE %s%%', [name])
    cursor.execute('SELECT name FROM restaurants WHERE name = %s', [table, name])
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
