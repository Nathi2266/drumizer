from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
import os

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    db.init_app(app)
    jwt.init_app(app)

    # Ensure folders exist
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    os.makedirs(app.config['GENERATED_FOLDER'], exist_ok=True)

    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.samples import samples_bp
    from app.routes.generate import generate_bp

    app.register_blueprint(auth_bp, url_prefix='/')
    app.register_blueprint(samples_bp, url_prefix='/')
    app.register_blueprint(generate_bp, url_prefix='/')

    # Create DB tables
    with app.app_context():
        db.create_all()

    return app 
