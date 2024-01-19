import os
import requests
from datetime import datetime, timedelta
from services.CachingService import read_cached_data, write_cached_data, is_cache_valid

STATIC_FOLDER = "static"
CURRENCY_API_BASE_URL = 'https://currency-exchange-api-six.vercel.app/api/v2/currencies/'

def get_available_crypto_currencies(force_refresh=False): #da osvezi pre isteka 24h
    cached_file = os.path.join(STATIC_FOLDER, "available_crypto_currencies.json")

    if not force_refresh and is_cache_valid(cached_file):
        data = read_cached_data(cached_file)
        if data:
            return data.get("rates", {})

    data = requests.get(CURRENCY_API_BASE_URL + "today").json()
    write_cached_data(cached_file, data)

    return data.get('rates', {})

#iz evra u kripto
def convert_crypto_currency(amount, currency):
    exchange_rates = get_available_crypto_currencies()

    if not isinstance(exchange_rates, dict):
        return -1

    converted = exchange_rates[currency] * float(amount)

    return round(converted, 10)

# iz kripto u dolare
def convert_crypto_to_dollars(amount, currency):
    exchange_rates = get_available_crypto_currencies()

    if not isinstance(exchange_rates, dict):
        return -1

    converted = exchange_rates[currency] * float(amount)
    converted = float(amount) / float(exchange_rates[currency])

    # from eur to usd
    from services.currencyConverter import convert_currency
    convert_currency(converted, 'EUR', 'USD')

    return round(converted, 10)


# povuci kurs od prethodnog dana
def get_available_crypto_currencies_yesterday(force_refresh=False): #da osvezi pre isteka 24h
    cached_file = os.path.join(STATIC_FOLDER, "available_crypto_currencies_yesterday.json")

    if not force_refresh and is_cache_valid(cached_file):
        data = read_cached_data(cached_file)
        if data:
            return data.get("rates", {})

    data = requests.get(CURRENCY_API_BASE_URL + "yesterday").json()
    write_cached_data(cached_file, data)

    return data.get('rates', {})

#iz evra u kripto
def convert_crypto_currency_yesterday(amount, currency):
    exchange_rates = get_available_crypto_currencies_yesterday()

    if not isinstance(exchange_rates, dict):
        return -1

    converted = exchange_rates[currency] * float(amount)
    return round(converted, 10)
