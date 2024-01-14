from flask import Flask, request
from flask_cors import CORS
from config import db
from routes.user import users_blueprint
from routes.currencies import currencies

app = Flask(__name__)

CORS(app, origins= "*", methods=["POST", "GET", "PUT", "DELETE"])

app.config.from_pyfile('config.py')

db.init_app(app)

app.register_blueprint(users_blueprint)
app.register_blueprint(currencies)

if __name__ == '__main__':
    app.run(debug=True)