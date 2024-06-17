from flask import Blueprint, request, jsonify

from backend.models.models import Feedback, db

feedback_bp = Blueprint('feedback', __name__)

@feedback_bp.route('/feedbacks', methods=['GET'])
def get_feedback():
    # Fetch all categories
    feedbacks = Feedback.query.all()
    feedback_list = []
    for f in feedbacks:
        feedback_data = {
            'id': str(f.id),
            'comment': f.comment,
            "rating": f.rating,
            'added_at': f.added_at,
            'feedback_by': {
                'user_id': f.user.user_id,
                'name': f.user.name,
                'branch': f.user.branch,
                'username': f.user.username,
                'isAdmin': f.user.isAdmin
            }
        }
        feedback_list.append(feedback_data)

    return jsonify(feedback_list), 200


@feedback_bp.route('/feedback', methods=['POST'])
def add_feedback():
    # Get data from the request body
    data = request.json
    feedback_by = data.get('feedback_by')
    rating = data.get('rating')
    comment = data.get('comment')
    category = data.get('category')

    # Check if 'feedback_by' is provided
    if not feedback_by or not rating or not category:
        return jsonify({"error": "Please provide required details."}), 400

    # Create a new category
    feedback = Feedback(feedback_by=feedback_by, rating=rating, comment=comment, category=category)

    # Add to the database session and commit
    db.session.add(feedback)
    db.session.commit()

    # Return a success message with the new category details
    return jsonify({"message": "Feedback added successfully."}), 201
