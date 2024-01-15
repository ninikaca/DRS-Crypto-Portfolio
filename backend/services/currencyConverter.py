import os
import requests
from services.CachingService import read_cached_data, write_cached_data, is_cache_valid

STATIC_FOLDER = "static"
CURRENCY_API_URL = 'https://currency-exchange-api-six.vercel.app/'

def get_available_currencies(force_refresh=False): #da osvezi pre isteka 24h
    cached_file = os.path.join(STATIC_FOLDER, "available_currencies.json")

    if not force_refresh and is_cache_valid(cached_file):
        data = read_cached_data(cached_file)
        if data:
            return [currency["code"] for currency in data["currencies"]]

    data = requests.get(CURRENCY_API_URL + "/api/v1/currencies").json()
    write_cached_data(cached_file, data)

    return [currency["code"] for currency in data["currencies"]]


def get_available_currencies_course(force_refresh=False):
    cached_file = os.path.join(STATIC_FOLDER, "available_currencies_course.json")

    if not force_refresh and is_cache_valid(cached_file):
        data = read_cached_data(cached_file)
        if data:
            return {currency["code"]: currency for currency in data["currencies"]}

    data = requests.get(CURRENCY_API_URL + "/api/v1/currencies/today").json()
    write_cached_data(cached_file, data)

    return {currency["code"]: currency for currency in data["currencies"]}

#iz evra u dolare
def convert_currency(amount, from_currency, to_currency):
    exchange_rates = get_available_currencies_course()

    if not isinstance(exchange_rates, dict):
        return -1

    from_rate_data = exchange_rates.get(from_currency)
    to_rate_data = exchange_rates.get(to_currency)

    from_rate = float(from_rate_data.get("course").replace(",", ".")) / float(
        from_rate_data.get("number")
    )
    to_rate = float(to_rate_data.get("course").replace(",", ".")) / float(
        to_rate_data.get("number")
    )

    converted = from_rate * float(amount) / to_rate
    return round(converted, 4)
