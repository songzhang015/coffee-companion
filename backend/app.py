from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from models import db, User
from seeder import seed_db
import os

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
CORS(app)

db.init_app(app)

@app.route('/')
def index():
    return jsonify({"message": "Hello, World!"})

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{"id": user.id, "username": user.username, "email": user.email} for user in users])

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()
        if not User.query.first():
            seed_db(db)
    app.run(debug=True, port=5000)