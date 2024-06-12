from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError

from models.models import db, MasterStationaryList

stationary_bp = Blueprint('stationary', __name__)


# Delete a stationary item by ID
@stationary_bp.route('/stationary/<int:id>', methods=['DELETE'])
def delete_stationary(stationary_id):
    stationary = MasterStationaryList.query.filter_by(id=stationary_id).first()
    if not stationary:
        return jsonify({"error": "Stationary item not found."}), 404

    db.session.delete(stationary)
    db.session.commit()

    return jsonify({"message": "Stationary item deleted successfully."}), 200


# Add master fruits list
@stationary_bp.route('/add_master_stationary_list', methods=['POST'])
def add_master_stationary_list():
    data = request.json  # Assuming the data comes as JSON

    # Create a list to store new user objects
    new_Data = []
    for stationary_data in data:
        name = stationary_data.get("name")
        icon = stationary_data.get("icon")
        isAvailable = stationary_data.get("isAvailable")
        last_updated_by = stationary_data.get('last_updated_by')

        if not name or not last_updated_by:
            return jsonify({"error": "Name and Last Updated By required."}), 400

        stationary = MasterStationaryList(name=name, icon=icon, isAvailable=isAvailable, last_updated_by=last_updated_by)
        new_Data.append(stationary)

    try:
        # Add the list of new categories to the database session and commit the transaction
        db.session.add_all(new_Data)
        db.session.commit()
        return jsonify({"message": "Master stationary list added successfully."}), 201
    except IntegrityError as e:
        # If a unique constraint violation occurs, roll back the transaction
        db.session.rollback()
        return jsonify({"error": str(e.__cause__)}), 400


@stationary_bp.route('/master_stationary_list', methods=['GET'])
def get_master_stationary_list():
    # Fetch all fruits and their associated category name
    stationary = MasterStationaryList.query.all()
    stationary_list = []
    for s in stationary:
        stationary_data = {
            "id": s.id,
            "name": s.name,
            "icon": s.icon,
            "isAvailable": s.isAvailable,
            'last_updated_by': {
                'user_id': s.user.user_id,
                'name': s.user.name,
                'branch': s.user.branch,
                'username': s.user.username,
                'isAdmin': s.user.isAdmin
            }
        }
        stationary_list.append(stationary_data)
    return jsonify(stationary_list), 200

@stationary_bp.route('/update_stationary_availability', methods=['POST'])
def update_stationary_availability():
    # Get the incoming JSON data
    data = request.json

    if not isinstance(data, list):
        return jsonify({'error': 'Expected a list of items to update'}), 400

    # Loop through the data and update the database
    for item in data:
        # Ensure the item has the required keys
        if 'name' in item and 'isAvailable' in item and 'last_updated_by' in item:
            # Find the corresponding fruit by name
            stationary = MasterStationaryList.query.filter_by(name=item['name']).first()

            if stationary:
                # Update the isAvailable status
                stationary.isAvailable = item['isAvailable']
                stationary.last_updated_by = item['last_updated_by']
            else:
                return jsonify({'error': f"Fruit with name '{item['name']}' not found"}), 404
        else:
            return jsonify({'error': 'Each item must have "name", "isAvailable" and "last_updated_by" keys'}), 400

    # Commit the changes to the database
    db.session.commit()

    return jsonify({'status': 'success', 'message': 'Inventory updated successfully'}), 200
