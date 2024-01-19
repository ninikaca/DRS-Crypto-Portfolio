from flask import Blueprint
import requests

currencies_blueprint = Blueprint('currencies_blueprint', __name__)

@currencies_blueprint.route('/api/currencies/get/rates', methods = ["GET"])
def get_currency():
    url = "https://currency-exchange-api-six.vercel.app/api/v2/currencies/today"

    headers = {
        "Content-Type": "application/json",
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an HTTPError for bad responses
        exchange_rates = response.json()
        return exchange_rates, 200
    except Exception as e:
        return "Error fetching exchange rates:", 500