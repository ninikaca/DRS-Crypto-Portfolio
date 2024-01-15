from flask import Flask, request
from flask_cors import CORS
from config import db
from routes.user import users_blueprint
from routes.currencies import currencies_blueprint
from routes.transaction import transaction_blueprint

app = Flask(__name__)

CORS(app, origins= "*", methods=["POST", "GET", "PUT", "DELETE"])

app.config.from_pyfile('config.py')

db.init_app(app)

app.register_blueprint(users_blueprint)
app.register_blueprint(currencies_blueprint)
app.register_blueprint(transaction_blueprint)

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True,port='5001') # ovo je zbog docker-a