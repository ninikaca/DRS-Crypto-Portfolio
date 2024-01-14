from flask import Blueprint, jsonify, request
from controllers.user import create_user, check_user, get_user, edit_user

users_blueprint = Blueprint('users_blueprint', __name__)

@users_blueprint.route('/api/users/create', methods = ["POST"])
def create():
    data = request.get_json()

    name = data.get('name')
    surname = data.get('surname')
    address = data.get('address')
    city = data.get('city')
    country = data.get('country')
    number = data.get('number')
    email = data.get('email')
    password = data.get('password')

    if not all([name, surname, address, city, country, number, email, password]):
        return jsonify({'data': 'Missing required fields'}), 400
    
    if create_user(name, surname, address, city, country, number, email, password):
        return jsonify({'data': "Uspesno kreiran korisnik."}), 201
    else:
        return jsonify({'data': "Korisnik nije uspesno kreiran."}), 501
    
@users_blueprint.route('/api/users/login', methods=["POST"])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({'data': 'Missing email or password'}), 400

    if check_user(email, password):
        return jsonify({'data': 'Successfully logged in user.'}), 200
    else:
        return jsonify({'data': 'Login failed.'}), 401
    
@users_blueprint.route('/api/users/get', methods=["POST"])
def get():
    data = request.get_json()
    email = data.get('email')

    if not all([email]):
        return jsonify({'data': 'Missing email'}), 400

    user = get_user(email)

    if user:
        return jsonify({'data': user.serialize()}), 200
    else:
        return jsonify({'data': 'The user does not exist.'}), 404
    
@users_blueprint.route('/api/users/edit', methods = ["POST"])
def edit():

    data = request.get_json()
    id = data.get('id')
    name = data.get('name')
    surname = data.get('surname')
    address = data.get('address')
    city = data.get('city')
    country = data.get('country')
    number = data.get('number')
    email = data.get('email')
    password = data.get('password')

    if not all([id, name, surname, address, city, country, number, email, password]):
        return jsonify({'data': 'Missing required fields'}), 400
    
    if edit_user(id, name, surname, address, city, country, number, email, password):
        return jsonify({'data': "Successfully changed user."}), 200
    else:
        return jsonify({'data': "Change failed."}), 500