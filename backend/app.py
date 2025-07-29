from flask import Flask, jsonify, send_from_directory, request, session 
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
from models import db, User
from seeder import seed_db
import os

load_dotenv()

app = Flask(__name__, static_folder='../frontend/dist')
app.secret_key = os.getenv("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
CORS(app)

db.init_app(app)

# Serve HTML pages
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
    return jsonify([{"id": user.id, "email": user.email} for user in users])

@app.route('/api/users', methods=['POST'])
def register(): # TODO Add more checks (try except?), test registration, at least 6 chars
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'message': "Missing data"}), 400

        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'success': False, 'message': "Email and password required"}), 400
        
        if len(password) < 6:
            return jsonify({'success': False, 'message': "Password must be at least 6 characters long"}), 400

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'success': False, 'message': "Email already registered"}), 409
        
        hashed_password = generate_password_hash(password)
        new_user = User(email=email, password=hashed_password)

        db.session.add(new_user)
        db.session.commit()
        return jsonify({'success': True, 'message': "Registration successful"}), 201
    except Exception as e:
        return jsonify({'success': False, 'message': "Internal server error"}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'message': "Missing data"}), 400
        
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({'success': False, 'message': "Email and password required"}), 400

        user = User.query.filter_by(email=email).first()

        if user and check_password_hash(user.password, password):
            session['user_id'] = user.id
            return jsonify({'success': True, 'message': "Login successful"}), 200
        else:
            return jsonify({'success': False, 'message': "Incorrect password"}), 401
    except Exception as e:
        return jsonify({'success': False, 'message': "Internal server error"}), 500

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'success': True, 'message': "Logout successful"}), 200

@app.route('/api/entries', methods=['GET'])
def get_user_entries():
    if 'user_id' not in session:
        return jsonify({'success': False, 'message': "Not authenticated"}), 401
    user_id = session['user_id']
    user = User.query.get(user_id)

    entries = [
        {
            "id": entry.id,
            "title": entry.title,
            "date": entry.date,
            "roastLevel": entry.roastLevel,
            "coffeeAmount": entry.coffeeAmount,
            "waterTemp": entry.waterTemp,
            "waterAmount": entry.waterAmount,
            "grindSize": entry.grindSize,
            "brewTime": entry.brewTime,
            "notes": entry.notes,
            "aroma": entry.aroma,
            "texture": entry.texture,
            "flavor": entry.flavor,
            "acidity": entry.acidity,
        }
        for entry in user.entries
    ]

    return jsonify({'success': True, 'entries': entries}), 200

if __name__ == '__main__':
    with app.app_context():
        # db.drop_all()
        db.create_all()
        if not User.query.first():
            seed_db(db)
    app.run(debug=True, port=5000)