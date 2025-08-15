from flask import Blueprint, request, jsonify, current_app
from app import db
from app.models.models import GeneratedLoop
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.audio_processing.drum_generator import generate_drum_loop
import uuid

generate_bp = Blueprint('generate', __name__)

@generate_bp.route('/generate-drums', methods=['POST'])
@jwt_required()
def generate_drums():
    user_id = get_jwt_identity()
    data = request.get_json()
    kick = data.get('kick', 4)
    shaker = data.get('shaker', 8)
    perc = data.get('perc', 2)

    pattern_settings = {'kick': kick, 'shaker': shaker, 'perc': perc}

    output_name = f"{uuid.uuid4()}.wav"
    output_path = generate_drum_loop(current_app.config['UPLOAD_FOLDER'],
                                     current_app.config['GENERATED_FOLDER'],
                                     pattern_settings,
                                     output_name)

    generated = GeneratedLoop(user_id=user_id, filename=output_name, pattern_settings=pattern_settings)
    db.session.add(generated)
    db.session.commit()

    return jsonify({'file_path': f'generated/{output_name}'})
