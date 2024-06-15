from flask import Blueprint, request, jsonify

from backend.models.models import db, Orders

orders_bp = Blueprint('orders', __name__)

@orders_bp.route('/add_order', methods=['POST'])
def add_order():
    # Get data from the request body
    data = request.json
    ordered_by = data.get('ordered_by')
    comment = data.get('comment')
    items = data.get('items')

    # Check if 'feedback_by' is provided
    if not ordered_by or not items or not comment:
        return jsonify({"error": "Please provide required details."}), 400

    # Create a new category
    orders = Orders(items=items, comment=comment, ordered_by=ordered_by)

    # Add to the database session and commit
    db.session.add(orders)
    db.session.commit()

    # Return a success message with the new category details
    return jsonify({"message": "Orders added successfully."}), 201


@orders_bp.route('/orders', methods=['GET'])
def arc_orders():
    # Retrieve all users from the Users table
    all_orders = Orders.query.all()

    # Manually serialize each user object into a dictionary
    orders_list = []
    for s in all_orders:
        orders_data = {
            "oid": s.oid,
            "comment": s.comment,
            "items": s.items,
            "dateTime": s.dateTime,
            'ordered_by': {
                'user_id': s.user.user_id,
                'name': s.user.name,
                'branch': s.user.branch,
                'username': s.user.username,
                'isAdmin': s.user.isAdmin
            }
        }
        orders_list.append(orders_data)
    return jsonify(orders_list), 200
