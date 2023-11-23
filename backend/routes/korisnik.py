from flask import Blueprint, jsonify, request
from controllers.korisnik import kreiraj_korisnika

korisnici_blueprint = Blueprint('korisnici_blueprint', __name__)

@korisnici_blueprint.route('/korisnici/kreiraj', methods = ["POST"])
def kreiraj():
    data = request.get_json()  # Assuming JSON data is sent in the request
    # Extracting data from JSON payload

    print(data)
    ime = data.get('ime')
    prezime = data.get('prezime')
    adresa = data.get('adresa')
    grad = data.get('grad')
    drzava = data.get('drzava')
    telefon = data.get('telefon')
    email = data.get('email')
    lozinka = data.get('lozinka')

    if not all([ime, prezime, adresa, grad, drzava, telefon, email, lozinka]):
        return jsonify({'error': 'Missing required fields'}), 400
    
    if kreiraj_korisnika(ime, prezime, adresa, grad, drzava, telefon, email, lozinka):
        return jsonify({"Uspesno kreiran korisnik."}), 201
    else:
        return jsonify({"Korisnik nije uspesno kreiran."}), 501