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

def concatenate_restaurant_data(item_url):
    source_code = requests.get(item_url)
    plain_text = source_code.text
    soup = BeautifulSoup(plain_text, features="html5lib")

    total_review = ""
    i = 1
    for item_name in soup.findAll('p', {'itemprop': 'description'}):
        total_review += "\n\n  | Review #" + str(i) + " | ";
        total_review += item_name.string + "  \n\n "
        i += 1

    first_string_found = False
    total_hours = ""
    class_str = 'lemon--p__373c0__3Qnnj text__373c0__2pB8f'
    class_str += 'no-wrap__373c0__3qDj1 text-color--normal'
    class_str += '__373c0__K_MKN text-align--left__373c0__2pnx_'

    daily_hours = False

    for item_name in soup.findAll('p', {
        'class': 'class_str'}):
        if item_name.string != "":
            total_hours += "Hours respectively from Monday to Sunday\n"
        total_hours += item_name.string

        if (item_name.string != None):
            first_string_found = True

    count_items = 1
    add_str = ""

    monday_hours = ""
    wednesday_hours = ""
    thursday_hours = ""
    friday_hours = ""
    saturday_hours = ""
    sunday_hours = ""

    for item_name in soup.findAll('span', {'class': 'nowrap'}):
        if total_hours == "" or first_string_found == False:
            daily_hours = True
            if item_name.string.find("Closed now") == -1:
                add_str += item_name.string
                if (count_items % 2 == 1):
                    add_str += " – "
                if (count_items == 2):
                    monday_hours = add_str
                    add_str = ""
                if (count_items == 4):
                    tuesday_hours = add_str
                    add_str = ""
                if (count_items == 6):
                    wednesday_hours = add_str
                    add_str = ""
                if (count_items == 8):
                    thursday_hours = add_str
                    add_str = ""
                if (count_items == 10):
                    friday_hours = add_str
                    add_str = ""
                if (count_items == 12):
                    saturday_hours = add_str
                    add_str = ""
                if (count_items == 14):
                    sunday_hours = add_str
                    add_str = ""

                count_items += 1

    if monday_hours != "":
        monday_hours = re.sub(u"\u2013", "-", monday_hours)
    if tuesday_hours != "":
        tuesday_hours = re.sub(u"\u2013", "-", tuesday_hours)
    if wednesday_hours != "":
        wednesday_hours = re.sub(u"\u2013", "-", wednesday_hours)
    if thursday_hours:
        thursday_hours = re.sub(u"\u2013", "-", thursday_hours)
    if friday_hours:
        friday_hours = re.sub(u"\u2013", "-", friday_hours)
    if saturday_hours:
        saturday_hours = re.sub(u"\u2013", "-", saturday_hours)
    if sunday_hours:
        sunday_hours = re.sub(u"\u2013", "-", sunday_hours)

    if daily_hours:
        restaurant_dict = {"hours": {
            "Monday": monday_hours,
            "Tuesday": tuesday_hours,
            "Wednesday": wednesday_hours,
            "Thursday": thursday_hours,
            "Friday": friday_hours,
            "Saturday": saturday_hours,
            "Sunday": sunday_hours
            },
            "reviews": total_review
            }
    else:
        restaurant_dict = {"hours": total_hours, "reviews": total_review}

    json_str = json.dumps(restaurant_dict)
    print(json_str)

    return json_str
    
def get_single_restaurant_data(restaurant_name, url):
    restaurant_page = 0
    found_restaurant = False
    latency_count = 0

    while found_restaurant == False:
        if latency_count > 7:
            break

        url += str(restaurant_page)
        url_source_html = requests.get(url)
        indiv_page_text = url_source_html.text
        soup_obj = BeautifulSoup(indiv_page_text, features="html5lib")

        for link in soup_obj.findAll('a', {
            'class': 'lemon--a__373c0__IEZFH link__373c0__29943 link-color--blue-dark__373c0__1mhJo link-size--inherit__373c0__2JXk5'}):
            href = "https://www.yelp.com" + link.get('href')
            title = link.string

            if (title.find(restaurant_name) != -1):
                concatenate_restaurant_data(href)
                found_restaurant = True
            else:
                restaurant_page += 10
                latency_count += 1


def generate_list_of_similar_restaurants(restaurants, passed_url):
    url = passed_url
    url_source_html = requests.get(url)
    indiv_page_text = url_source_html.text
    soup_obj = BeautifulSoup(indiv_page_text, features = "html5lib")

    for link in soup_obj.findAll('a', {
        'class': 'lemon--a__373c0__IEZFH link__373c0__29943 link-color--blue-dark__373c0__1mhJo link-size--inherit__373c0__2JXk5'}):
        href = "https://www.yelp.com" + link.get('href')
        title = link.string

        if (title.find("read more") == -1):
            title = re.sub(u"\u2019s", "-", title)
            restaurants["restaurants"].append({"title": title, "url": href})

    return restaurants


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