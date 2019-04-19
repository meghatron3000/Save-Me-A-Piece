import requests
from bs4 import BeautifulSoup
import json

def parse_local_url(city, state):
    city_str = city.split(" ")
    index = 0

    ret_url = "https://www.yelp.com/search?find_desc=&find_loc="

    while index < len(city_str):
        ret_url += city_str[index]
        if index < len(city_str) - 1:
            ret_url += "+"
        index += 1

    ret_url += "%2C+" + state_abbreviation[state]
    ret_url += "&ns=1&start="

    return ret_url

def scrape_restaurant(restaurant_name, city, state, max_pages):
    url = parse_local_url(city, state)
    page = 0

    get_single_restaurant_data(restaurant_name, url)
    restaurants = { "restaurants": []}

    while page < (max_pages * 10):
        url += str(page)
        restaurants = generate_list_of_similar_restaurants(restaurants, url)
        page += 10

    json_str = json.dumps(restaurants)
    print(json_str)

    return json_str


def main_data_scraper(restaurant_name, city, state):
    name_valid = False
    city_valid = False
    state_valid = False

    if restaurant_name is not None:
        name_valid = True
    if city is not None:
        city_valid = True
    if state is not None:
        state_valid = True

    if name_valid & city_valid & state_valid:
        max_pages = 2
        scrape_restaurant(restaurant_name, city, state, max_pages)


main_data_scraper("Happy Lemon", "Cupertino", "California")