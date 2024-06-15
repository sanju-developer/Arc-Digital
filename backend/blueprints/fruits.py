from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError

from backend.models.models import db, MasterFruitsList

fruits_bp = Blueprint('fruits', __name__)

# Delete a fruit by ID
@fruits_bp.route('/fruits/<int:id>', methods=['DELETE'])
def delete_fruit(fruit_id):
    fruit = MasterFruitsList.query.filter_by(id=fruit_id).first()
    if not fruit:
        return jsonify({"error": "Fruit not found."}), 404

    db.session.delete(fruit)
    db.session.commit()

    return jsonify({"message": "Fruit deleted successfully."}), 200


# Add master fruits list
@fruits_bp.route('/add_master_fruit_list', methods=['POST'])
def add_master_fruit_list():
    data = request.json  # Assuming the data comes as JSON

    # Create a list to store new user objects
    new_Data = []
    for fruits_data in data:
        name = fruits_data.get("name")
        icon = fruits_data.get("icon")
        isAvailable = fruits_data.get("isAvailable")
        last_updated_by = fruits_data.get('last_updated_by')

        if not name or not last_updated_by:
            return jsonify({"error": "Name and Last Updated By required."}), 400

        stationary = MasterFruitsList(name=name, icon=icon, isAvailable=isAvailable, last_updated_by=last_updated_by)
        new_Data.append(stationary)

    try:
        # Add the list of new categories to the database session and commit the transaction
        db.session.add_all(new_Data)
        db.session.commit()
        return jsonify({"message": "Master fruits list added successfully."}), 201
    except IntegrityError as e:
        # If a unique constraint violation occurs, roll back the transaction
        db.session.rollback()
        return jsonify({"error": str(e.__cause__)}), 400


@fruits_bp.route('/master_fruit_list', methods=['GET'])
def get_master_fruit_list():
    # Fetch all fruits and their associated category name
    fruits = MasterFruitsList.query.all()
    fruits_list = []
    for f in fruits:
        fruits_data = {
            "id": f.id,
            "name": f.name,
            "icon": f.icon,
            "isAvailable": f.isAvailable,
            'last_updated_by': {
                'user_id': f.user.user_id,
                'name': f.user.name,
                'branch': f.user.branch,
                'username': f.user.username,
                'isAdmin': f.user.isAdmin
            }
        }
        fruits_list.append(fruits_data)
    return jsonify(fruits_list), 200


@fruits_bp.route('/update_fruits_availability', methods=['POST'])
def update_fruits_availability():
    # Get the incoming JSON data
    data = request.json

    if not isinstance(data, list):
        return jsonify({'error': 'Expected a list of items to update'}), 400

    # Loop through the data and update the database
    for item in data:
        # Ensure the item has the required keys
        if 'name' in item and 'isAvailable' in item and 'last_updated_by' in item:
            # Find the corresponding fruit by name
            fruit = MasterFruitsList.query.filter_by(name=item['name']).first()

            if fruit:
                # Update the isAvailable status
                fruit.isAvailable = item['isAvailable']
                fruit.last_updated_by = item['last_updated_by']
            else:
                return jsonify({'error': f"Fruit with name '{item['name']}' not found"}), 404
        else:
            return jsonify({'error': 'Each item must have "name", "isAvailable" and "last_updated_by" keys'}), 400

    # Commit the changes to the database
    db.session.commit()

    return jsonify({'status': 'success', 'message': 'Inventory updated successfully'}), 200
