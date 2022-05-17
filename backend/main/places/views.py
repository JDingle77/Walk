from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse

import requests
from math import sin, cos, sqrt, atan2, radians

from .models import Restaurant
#from .serializers import RestaurantSerializer

YELP_URL = "https://api.yelp.com/v3/businesses/search"
MAX_BUSINESSES = 10 #yelps maximum supported business search
RADIUS = 4000 #for search (in meters)

#current API key is for a class project that I had last time
CLIENT_ID = "bTFkcwBT7_IoIaYYIrHUTg"
API_KEY = "LYp6n8UlBQ1-AWc9MJGKrDao6oK3fR2t5feaaqzk7f9KZCCqLSKxfFUK8aYdP7kF64RH3gG-xXKkGbp2YgZga2z0IdEMig_i_6Wk2_qh2tLkpzpVktlE8h3GeXGAYnYx"
HEADERS = {"authorization" : "BEARER {}".format(API_KEY)}

#https://stackoverflow.com/questions/19412462/getting-distance-between-two-points-based-on-latitude-longitude
def distance_from_lat_long(lat1, lon1, lat2, lon2):

    # approximate radius of earth in km
    R = 6373.0

    lat1 = radians(lat1)
    lon1 = radians(lon1)
    lat2 = radians(lat2)
    lon2 = radians(lon2)

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    #in meters
    distance = R * c * 1000

    return distance


#user_loc is either a tuple with (latidude,longitude) or a location (Eg. Los Angeles)

#Yelp can take categories (eg. Restaurants)
#https://www.yelp.com/developers/documentation/v3/all_category_list

#Offset can be used to take second page, third page, etc

#search_term

#sort_by -> best_match, rating, review_count or distance


#function returns a list of dictionaries
#dictionaries represent the restaurant and details
#https://www.yelp.com/developers/documentation/v3/business_search <-- has documentation on all information gained form this API
def yelp_business_locater(user_loc, search_term = "", sort_by = "best_match", categories = "restaurants", offset = 0):

    #base parameters
    params = {"categories" : categories,
                "offset" : offset,
                "sort_by" : sort_by,
                "limit" : MAX_BUSINESSES}

    #if not dog park, need to add dog friendly
    if categories not in ['dog_parks']:
        params['terms'] = "Dog Friendly {}".format(search_term)

    #meaning there is given longitude and latitude
    if len(user_loc) == 2:
        params["latitude"] = user_loc[0]
        params["longitude"] = user_loc[1]
    
    #not a list/tuple, thereform user_loc is string
    else:
        params["location"] = user_loc

    #execute API call
    r = requests.get(YELP_URL, headers=HEADERS, params=params)
    if r.status_code != 200:
        return None

    data = r.json()["businesses"]
    
    for d in data:

        desc = ""

        #combine the category title, into a description
        #eg. 'categories': [{'alias': 'themedcafes', 'title': 'Themed Cafes'},
        #                   {'alias': 'pet_training', 'title': 'Pet Training'},
        #                   {'alias': 'pet_sitting', 'title': 'Pet Sitting'}]
        #      becomes: 'Themed Cafes, Pet Training, Pet Sitting'
        
        for entry in d["categories"]:
            desc += entry["title"]+", "

        d["desc"] = desc.strip()[:len(desc)-2]

    return data

def is_float(val):
    try:
        float(val)
        return True
    except ValueError:
        return False

@api_view(['GET'])
def search_restaurants(request):

    lat = request.GET.get('lat', "A")
    long = request.GET.get('long', "A")

    location = request.GET.get('location', None)

    if is_float(lat) and is_float(long):
        user_loc = tuple(lat, long)

    elif location is not None:
        user_loc = location
    
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    offset = request.GET.get('offset', 0)
    sort_by = request.GET.get('sort_by', "best_match")
    search_term = request.GET.get('q', '')

    yelp_data = yelp_business_locater(user_loc,
                                        search_term = search_term,
                                        sort_by = sort_by,
                                        categories = "restaurants",
                                        offset = offset)

    if yelp_data is None:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    return JsonResponse(yelp_data, safe=False, status=status.HTTP_200_OK)


@api_view(['GET'])
def search_parks(request):
    lat = request.GET.get('lat', "A")
    long = request.GET.get('long', "A")

    location = request.GET.get('location', None)

    if is_float(lat) and is_float(long):
        user_loc = tuple(lat, long)

    elif location is not None:
        user_loc = location
    else:
        print("Location Error")
        return Response(status=status.HTTP_400_BAD_REQUEST)

    offset = request.GET.get('offset', 0)
    sort_by = request.GET.get('sort_by', "best_match")
    search_term = request.GET.get('q', '')

    yelp_data = yelp_business_locater(user_loc,
                                        search_term = search_term,
                                        sort_by = sort_by,
                                        categories = "parks",
                                        offset = offset)

    if yelp_data is None:
        print("API Error")
        return Response(status=status.HTTP_400_BAD_REQUEST)

    return JsonResponse(yelp_data, safe=False, status=status.HTTP_200_OK)

