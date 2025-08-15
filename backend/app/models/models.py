from app import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import JSON

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Sample(db.Model):
    __tablename__ = 'samples'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    filename = db.Column(db.String(200), nullable=False)
    sample_type = db.Column(db.String(50), nullable=False)
    bpm = db.Column(db.Integer, default=120)
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)

class GeneratedLoop(db.Model):
    __tablename__ = 'generated_loops'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    filename = db.Column(db.String(200), nullable=False)
    pattern_settings = db.Column(JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
