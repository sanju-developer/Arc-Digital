from flask import Blueprint, request, jsonify
from models.models import db, Feedback

feedback_bp = Blueprint('feedback', __name__)

@feedback_bp.route('/feedbacks', methods=['GET'])
def get_feedback():
    # Fetch all categories
    feedbacks = Feedback.query.all()
    return jsonify([{"user_id": f.user_id, "rating": f.rating, "comment": f.comment} for f in feedbacks])


@feedback_bp.route('/feedback', methods=['POST'])
def add_feedback():
    # Get data from the request body
    data = request.json
    user_id = data.get('user_id')
    rating = data.get('rating')
    comment = data.get('comment')

    # Check if 'user_id' is provided
    if not user_id or not rating:
        return jsonify({"error": "User id and rating is required"}), 400

    # Create a new category
    feedback = Feedback(user_id=user_id, rating=rating, comment=comment)

    # Add to the database session and commit
    db.session.add(feedback)
    db.session.commit()

    # Return a success message with the new category details
    return jsonify({"message": "Feedback added successfully"}), 201
