from flask import Blueprint, request, jsonify
from models.models import db, Categories

category_bp = Blueprint('categories', __name__)

@category_bp.route('/categories', methods=['GET'])
def get_categories():
    # Fetch all categories
    categories = Categories.query.all()
    return jsonify([{"cid": c.cid, "name": c.name} for c in categories])


@category_bp.route('/add_categories', methods=['POST'])
def add_category():
    # Get data from the request body
    data = request.json

    # Check if 'name' is provided
    name = data.get("name")
    if not name:
        return jsonify({"error": "Category name is required"}), 400

    # Check if the category already exists
    existing_category = Categories.query.filter_by(name=name).first()
    if existing_category:
        return jsonify({"error": "Category already exists"}), 400

    # Create a new category
    new_category = Categories(name=name)

    # Add to the database session and commit
    db.session.add(new_category)
    db.session.commit()

    # Return a success message with the new category details
    return jsonify({"message": "Category added successfully", "category": {"cid": new_category.cid, "name": new_category.name}}), 201
