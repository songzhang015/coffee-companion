from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")

CORS(app)

db = SQLAlchemy(app)

# Simple model, factor out later
class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(100), nullable=False)

@app.route('/')
def index():
    return jsonify({"message": "Hello, World!"})

@app.route('/db')
def database():
    try:
        db.create_all()
        msg = Message.query.first()
        if not msg:
            msg = Message(text="Database is working!")
            db.session.add(msg)
            db.session.commit()
        return jsonify({"message": msg.text})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)