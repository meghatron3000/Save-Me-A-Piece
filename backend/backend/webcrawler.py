import requests
from bs4 import BeautifulSoup

def restaurant_crawler(max_parse_pages):
    page = 0
    if page < (max_parse_pages*10):
        url = "https://www.yelp.com/search?find_desc=&find_loc=Urbana%20Champaign%2C%20IL&ns=2&start=" + str(page)
        url_html_tag_code = requests.get(url)
        soup_object = BeautifulSoup(url_html_tag_code.text, features="html5lib")

        for link in soup_object.findAll('a', {'class': 'lemon--a__373c0__IEZFH link__373c0__29943 link-color--blue-dark__373c0__1mhJo link-size--inherit__373c0__2JXk5'}):
            link_obj = "https://www.yelp.com" + link.get('href')
        page += 10

pass_pages_test = 3
restaurant_crawler(pass_pages_test)