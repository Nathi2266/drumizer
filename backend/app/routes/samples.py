from flask import Blueprint, request, jsonify, current_app
from app import db
from app.models.models import Sample
from flask_jwt_extended import jwt_required, get_jwt_identity
import os

samples_bp = Blueprint('samples', __name__)

@samples_bp.route('/upload-sample', methods=['POST'])
@jwt_required()
def upload_sample():
    if 'file' not in request.files:
        return jsonify({'message': 'No file uploaded'}), 400
    file = request.files['file']
    sample_type = request.form.get('sample_type', 'kick')
    user_id = get_jwt_identity()
    
    filename = file.filename
    filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    sample = Sample(user_id=user_id, filename=filename, sample_type=sample_type)
    db.session.add(sample)
    db.session.commit()

    return jsonify({'message': 'Sample uploaded successfully'})
