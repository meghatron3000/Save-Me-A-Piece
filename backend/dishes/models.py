from django.db import models
from django.db import connection
import psycopg2
import pprint
from django.http import HttpResponseRedirect

class Dish(models.Model):
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

def get_dishes(restuarant_email, restuarant_name):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM dishes WHERE restuarant_email = %s AND restuarant_name = %s", [restuarant_email, restuarant_name])
    row = cursor.fetchall()
    pprint.pprint(row)
    return row

def register_dish(restuarant_email,restuarant_name,name,price,listTime):
    cursor = connection.cursor()
    cursor.execute('INSERT INTO dishes ("restaurant_email", "restaurant_name", "name", "price", "listing_time") VALUES(%s, %s, %s, %s, %s) ', [restuarant_email, restuarant_name, name, price, listTime])
    # row = cursor.fetchall()
    # pprint.pprint(row)
    return [restuarant_email, restuarant_name, name, price, listTime]

def delete_dish(name, restuarant_email):
    cursor = connection.cursor()
    cursor.execute("DELETE FROM dishes WHERE name = %s AND restuarant_email = %s", [name, restuarant_email])
    return "success"