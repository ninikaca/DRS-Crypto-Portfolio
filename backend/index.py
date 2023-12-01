from flask import Flask, request
from flask_cors import CORS
from config import db
from routes.korisnik import korisnici_blueprint

app = Flask(__name__)

CORS(app, origins=["http://localhost:3000"], resources={r"/api/*": {"origins": "http://localhost:3000"}}, methods=["POST", "GET", "PUT", "DELETE"])

app.config.from_pyfile('config.py')

db.init_app(app)

app.register_blueprint(korisnici_blueprint)

if __name__ == '__main__':
    app.run(debug=True)