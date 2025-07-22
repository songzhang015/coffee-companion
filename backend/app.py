from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
from models import db, User
from seeder import seed_db
import os

load_dotenv()

app = Flask(__name__, static_folder='../frontend/dist')
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
CORS(app)

db.init_app(app)

# Serves HTML pages
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/home')
def home():
    return send_from_directory(app.static_folder, 'home.html')

@app.route('/account')
def account():
    return send_from_directory(app.static_folder, 'account.html')

# Serve JS, CSS, and other assets
@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory(f'{app.static_folder}/js', filename)

@app.route('/css/<path:filename>')
def serve_css(filename):
    return send_from_directory(f'{app.static_folder}/css', filename)

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory(f'{app.static_folder}/assets', filename)

# APIs
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