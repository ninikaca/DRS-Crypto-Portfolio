from flask import Blueprint, jsonify, request
from controllers.transaction import create, get_transaction_by_user
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
    
