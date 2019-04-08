# Save-Me-A-Piece
Two big issues which almost all metropolitan and big cities face is the catastrophic food waste problem and the income inequality/poverty rate. Every night loads of cooked and fresh food is thrown out because it did not go for sale the night of or before. Our project “Save me a Piece” looks to eliminate this problem by selling unsold food from restaurants to other non-profit vendors at a discounted rate. A restaurant will be able to post the food they will be selling and non-profits could choose which vendor to purchase from. This way restaurants can get rid of excess food and nonprofits seeking to feed the poor will always have an ample supply.
<br><br>
<h3>Instructions:</h3>

Run frontend:

cd frontend

npm install

npm run start

<br><br>
Run backend:

in root directory create and activate the virtual environment: 

python3 -m venv venv

source activate venv/bin/activate

pip install -r requirements.txt

python manage.py runserver

<br><br>
When making changes to models and views:

python manage.py makemigrations [name of folder], for example: python manage.py makemigrations restaurants

python manage.py migrate

<br><br>
Extremely helpful reference:
https://www.valentinog.com/blog/tutorial-api-django-rest-react/ 
