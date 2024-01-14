from flask import Blueprint, jsonify, request
from controllers.transaction import create
from models.transaction import Transaction

transaction_blueprint = Blueprint('transaction_blueprint', __name__)

@transaction_blueprint.route('/api/transaction/buyCrypto', methods = ["POST"])
def create_transaction():
    transaction = Transaction.deserialize(request.get_json())

    if not transaction:
        return jsonify({'data': 'Missing required fields'}), 400
    
    if create(transaction):
        return jsonify({'data': "Crypto bought successfully."}), 201
    else:
        return jsonify({'data': "Error."}), 500
    