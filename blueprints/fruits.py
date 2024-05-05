from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError

from models.models import db, Fruits, MasterFruitsList

fruits_bp = Blueprint('fruits', __name__)


# Add multiple fruits
@fruits_bp.route('/add_fruits', methods=['POST'])
def add_fruit():
    data = request.json  # Assuming the data comes as JSON

    # Create a list to store new user objects
    new_Data = []
    for user_data in data:
        name = user_data.get("name")
        isAvailable = user_data.get("isAvailable")
        cid = user_data.get("cid")

        if not name or not cid:
            return jsonify({"error": "Name and Category ID are required."}), 400

        stationary = Fruits(name=name, isAvailable=isAvailable, cid=cid)
        new_Data.append(stationary)

    try:
        # Add the list of new categories to the database session and commit the transaction
        db.session.add_all(new_Data)
        db.session.commit()
        return jsonify({"message": "Fruits added successfully."}), 201
    except IntegrityError as e:
        # If a unique constraint violation occurs, roll back the transaction
        db.session.rollback()
        return jsonify({"error": str(e.__cause__)}), 400


# Delete a fruit by ID
@fruits_bp.route('/fruits/<int:id>', methods=['DELETE'])
def delete_fruit(id):
    fruit = Fruits.query.filter_by(id=id).first()
    if not fruit:
        return jsonify({"error": "Fruit not found."}), 404

    db.session.delete(fruit)
    db.session.commit()

    return jsonify({"message": "Fruit deleted successfully."}), 200


@fruits_bp.route('/fruits', methods=['GET'])
def get_fruits():
    # Fetch all fruits and their associated category name
    fruits = Fruits.query.all()
    return jsonify([
        {
            "id": f.id,
            "name": f.name,
            "isAvailable": f.isAvailable,
            "category": f.category.name
        }
        for f in fruits
    ])


# Add master fruits list
@fruits_bp.route('/add_master_fruit_list', methods=['POST'])
def add_master_fruit_list():
    data = request.json  # Assuming the data comes as JSON

    # Create a list to store new user objects
    new_Data = []
    for fruits_data in data:
        fruit_id = fruits_data.get("id")
        name = fruits_data.get("name")
        icon = fruits_data.get("icon")

        if not fruit_id:
            return jsonify({"error": "Id is required."}), 400

        stationary = MasterFruitsList(id=fruit_id, name=name, icon=icon)
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
    return jsonify([
        {
            "id": f.id,
            "name": f.name,
            "icon": f.icon,
        }
        for f in fruits
    ])

