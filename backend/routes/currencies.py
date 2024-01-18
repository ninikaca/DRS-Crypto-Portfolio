from flask import Blueprint
import requests

currencies_blueprint = Blueprint('currencies_blueprint', __name__)

@currencies_blueprint.route('/api/currencies/get/rates', methods = ["GET"])
def get_currency():
    url = "http://api.exchangeratesapi.io/v1/latest"
    params = {"access_key": "8799e644980339e805115d5bf34915ce"}

    headers = {
        "Content-Type": "application/json",
    }

    try:
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()  # Raise an HTTPError for bad responses
        exchange_rates = response.json()
        return exchange_rates, 200
    except Exception as e:
        return "Error fetching exchange rates:", 500