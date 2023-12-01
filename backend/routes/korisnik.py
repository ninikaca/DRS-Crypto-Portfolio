from flask import Blueprint, jsonify, request
from controllers.korisnik import kreiraj_korisnika, proveri_korisnika

korisnici_blueprint = Blueprint('korisnici_blueprint', __name__)

@korisnici_blueprint.route('/api/korisnici/kreiraj', methods = ["POST"])
def kreiraj():
    data = request.get_json()

    ime = data.get('ime')
    prezime = data.get('prezime')
    adresa = data.get('adresa')
    grad = data.get('grad')
    drzava = data.get('drzava')
    telefon = data.get('telefon')
    email = data.get('email')
    lozinka = data.get('lozinka')

    if not all([ime, prezime, adresa, grad, drzava, telefon, email, lozinka]):
        return jsonify({'data': 'Missing required fields'}), 400
    
    if kreiraj_korisnika(ime, prezime, adresa, grad, drzava, telefon, email, lozinka):
        return jsonify({'data': "Uspesno kreiran korisnik."}), 201
    else:
        return jsonify({'data': "Korisnik nije uspesno kreiran."}), 501
    
@korisnici_blueprint.route('/api/korisnici/prijava', methods=["POST"])
def login():
    data = request.get_json()
    email = data.get('email')
    lozinka = data.get('lozinka')

    if not all([email, lozinka]):
        return jsonify({'data': 'Missing email or password'}), 400

    if proveri_korisnika(email, lozinka):
        return jsonify({'data': 'Uspesno ulogovan korisnik.'}), 200
    else:
        return jsonify({'data': 'Neuspesna prijava.'}), 401