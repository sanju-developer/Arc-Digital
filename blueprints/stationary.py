from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError

from models.models import db, Stationary, MasterStationaryList

stationary_bp = Blueprint('stationary', __name__)


# Add multiple stationary items
@stationary_bp.route('/add_stationary', methods=['POST'])
def add_stationary():
    data = request.json  # Assuming the data comes as JSON

    # Create a list to store new user objects
    new_Data = []
    for stationary_data in data:
        name = stationary_data.get("name")
        isAvailable = stationary_data.get("isAvailable")
        cid = stationary_data.get("cid")

        if not name or not cid:
            return jsonify({"error": "Name and Category ID are required."}), 400

        stationary = Stationary(name=name, isAvailable=isAvailable, cid=cid)
        new_Data.append(stationary)

    try:
        # Add the list of new categories to the database session and commit the transaction
        db.session.add_all(new_Data)
        db.session.commit()
        return jsonify({"message": "Category added successfully."}), 201
    except IntegrityError as e:
        # If a unique constraint violation occurs, roll back the transaction
        db.session.rollback()
        return jsonify({"error": str(e.__cause__)}), 400


# Delete a stationary item by ID
@stationary_bp.route('/stationary/<int:id>', methods=['DELETE'])
def delete_stationary(id):
    stationary = Stationary.query.filter_by(id=id).first()
    if not stationary:
        return jsonify({"error": "Stationary item not found."}), 404

    db.session.delete(stationary)
    db.session.commit()

    return jsonify({"message": "Stationary item deleted successfully."}), 200


@stationary_bp.route('/stationary', methods=['GET'])
def get_stationary():
    # Fetch all stationary items and their associated category name
    stationary = Stationary.query.all()
    return jsonify([
        {
            "id": s.id,
            "name": s.name,
            "isAvailable": s.isAvailable,
            "category": s.category.name
        }
        for s in stationary
    ])


# Add master fruits list
@stationary_bp.route('/add_master_stationary_list', methods=['POST'])
def add_master_stationary_list():
    data = request.json  # Assuming the data comes as JSON

    # Create a list to store new user objects
    new_Data = []
    for stationary_data in data:
        stationary_id = stationary_data.get("id")
        name = stationary_data.get("name")
        icon = stationary_data.get("icon")

        if not stationary_id:
            return jsonify({"error": "Id is required."}), 400

        stationary = MasterStationaryList(id=stationary_id, name=name, icon=icon)
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
    return jsonify([
        {
            "id": f.id,
            "name": f.name,
            "icon": f.icon,
        }
        for f in stationary
    ])
