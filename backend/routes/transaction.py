from flask import Blueprint, jsonify, request
from controllers.transaction import create, get_transaction_by_user, get_crypto_currencies_by_user,  \
     create_sale_transaction, delete_crypto, delete_transcation_by_id
from models.transaction import Transaction

transaction_blueprint = Blueprint('transaction_blueprint', __name__)

@transaction_blueprint.route('/api/transaction/buyCrypto', methods = ["POST"])
def buy():
    transaction = Transaction.deserialize(request.get_json())

    if not transaction:
        return jsonify({'data': 'Missing required fields'}), 400
    
    if create(transaction):
        return jsonify({'data': "Crypto bought successfully."}), 201
    else:
        return jsonify({'data': "Error."}), 500

@transaction_blueprint.route('/api/transaction/sellCrypto', methods = ["POST"])
def sell():
    transaction = Transaction.deserialize(request.get_json())

    if not transaction:
        return jsonify({'data': 'Missing required fields'}), 400
    
    if create_sale_transaction(transaction):
        return jsonify({'data': "Crypto sold successfully."}), 201
    else:
        return jsonify({'data': "Error."}), 500
    
@transaction_blueprint.route('/api/transaction/get', methods = ["POST"])
def get_transactions():
    data = request.get_json()
    user_id = data.get('user_id')
   
    if not user_id:
        return jsonify({'data': 'Missing required fields'}), 400
    
    transactions = get_transaction_by_user(user_id)
    if transactions:
        return jsonify(transactions), 200
    else:
        return jsonify({'data': "Error."}), 500
    
@transaction_blueprint.route('/api/transaction/getCryptoPortfolio', methods = ["POST"])
def get_portfolio():
    data = request.get_json()
    user_id = data.get('user_id')
   
    if not user_id:
        return jsonify({'data': 'Missing required fields'}), 400
    
    portfolio = get_crypto_currencies_by_user(user_id)

    if portfolio:
        return jsonify(portfolio), 200
    else:
        return jsonify({'data': "Error."}), 500
    
@transaction_blueprint.route('/api/transaction/deleteCurrency', methods = ["POST"])
def delete_crypto_currency():
    data = request.get_json()
    user_id = data.get('user_id')
    currency = data.get('currency')

    if not user_id or not currency:
        return jsonify({'data': 'Missing required fields'}), 400

    if delete_crypto(user_id, currency):
        return jsonify({'data': "Currency has been deleted from portfolio."}), 200
    else:
        return jsonify({'data': "Error."}), 500

@transaction_blueprint.route('/api/transaction/deleteTransaction', methods = ["POST"])
def delete_transcation_per_id():
    data = request.get_json()
    transaction_id = data.get('transaction_id')

    if not transaction_id:
        return jsonify({'data': 'Missing required fields'}), 400

    if delete_transcation_by_id(transaction_id):
        return jsonify({'data': "Transcation has been deleted from portfolio."}), 200
    else:
        return jsonify({'data': "Error."}), 500
    