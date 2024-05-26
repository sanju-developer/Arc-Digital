from flask import Blueprint, request, jsonify
from models.models import db, Orders

orders_bp = Blueprint('orders', __name__)

@orders_bp.route('/add_order', methods=['POST'])
def add_order():
    # Get data from the request body
    data = request.json
    ordered_by = data.get('ordered_by')
    fid = data.get('fid')
    name = data.get('name')

    # Check if 'feedback_by' is provided
    if not ordered_by or not fid or not name:
        return jsonify({"error": "Please provide required details."}), 400

    # Create a new category
    orders = Orders(name=name, fid=fid, ordered_by=ordered_by)

    # Add to the database session and commit
    db.session.add(orders)
    db.session.commit()

    # Return a success message with the new category details
    return jsonify({"message": "Orders added successfully."}), 201
