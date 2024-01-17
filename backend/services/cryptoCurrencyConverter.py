import os
import requests
from datetime import datetime, timedelta
from services.CachingService import read_cached_data, write_cached_data, is_cache_valid

STATIC_FOLDER = "static"
CURRENCY_API_BASE_URL = 'http://api.exchangeratesapi.io/v2/'
ACCESS_KEY = '?access_key=57d102e76d357aaaab5dba8955ffa5a8'

def get_available_crypto_currencies(force_refresh=False): #da osvezi pre isteka 24h
    cached_file = os.path.join(STATIC_FOLDER, "available_crypto_currencies.json")

    if not force_refresh and is_cache_valid(cached_file):
        data = read_cached_data(cached_file)
        if data:
            return data.get("rates", {})

    data = requests.get(CURRENCY_API_BASE_URL + "latest" + ACCESS_KEY).json()
    write_cached_data(cached_file, data)

    return data.get('rates', {})

#iz evra u kripto
def convert_crypto_currency(amount, currency):
    exchange_rates = get_available_crypto_currencies()

    if not isinstance(exchange_rates, dict):
        return -1

    converted = exchange_rates[currency] * float(amount)
    return round(converted, 10)

# povuci kurs od prethodnog dana
def get_available_crypto_currencies_yesterday(force_refresh=False): #da osvezi pre isteka 24h
    cached_file = os.path.join(STATIC_FOLDER, "available_crypto_currencies_yesterday.json")

    if not force_refresh and is_cache_valid(cached_file):
        data = read_cached_data(cached_file)
        if data:
            return data.get("rates", {})

    # racuna dan pre i vraca u formatu dan-mesec-godina
    yesterday_date_string = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")

    data = requests.get(CURRENCY_API_BASE_URL + yesterday_date_string + ACCESS_KEY).json()
    write_cached_data(cached_file, data)

    return data.get('rates', {})

#iz evra u kripto
def convert_crypto_currency_yesterday(amount, currency):
    exchange_rates = get_available_crypto_currencies_yesterday()

    if not isinstance(exchange_rates, dict):
        return -1

    converted = exchange_rates[currency] * float(amount)
    return round(converted, 10)
