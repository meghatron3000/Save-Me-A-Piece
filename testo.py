
body = {'email': 'poop@gmail.com', 'password': 'yoyo', 'name': 'poop', 'address': '123 sesame st', 'phone': 4087841234, 'zip_code': 95134, 'city': 'San Jose', 'state': 'California'}

print('INSERT INTO restaurants ("email", "password", "name", "address", "phone_number", "zip_code", "rating", "city", "state") VALUES(%s, %s, %s, %s, %s, %s, %d, %s, %s)' % 
    ( body["email"], body["password"], body["name"], body["address"], body["phone"], body["zip_code"], 0, body["city"], body["state"] ) )
