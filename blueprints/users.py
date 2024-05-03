from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError
from models.models import db, Users

users_bp = Blueprint('users', __name__)


# Route to add multiple users
@users_bp.route('/add_users', methods=['POST'])
def add_arc_users():
    # Parse request data
    data = request.json
    users = data.get('users')

    # Create a list to store new user objects
    new_users = []
    for user_data in users:
        unique_id = user_data.get('id')
        name = user_data.get('name')
        branch = user_data.get('branch')
        username = user_data.get('username')

        # Create a new user object and add it to the list
        new_user = Users(id=unique_id, name=name, branch=branch, username=username)
        new_users.append(new_user)

    try:
        # Add the list of new categories to the database session and commit the transaction
        db.session.add_all(new_users)
        db.session.commit()
        return jsonify({"message": "Users added successfully."}), 201
    except IntegrityError as e:
        # If a unique constraint violation occurs, roll back the transaction
        db.session.rollback()
        return jsonify({"error": str(e.__cause__)}), 400


@users_bp.route('/users', methods=['GET'])
def arc_users():
    # Retrieve all users from the Users table
    all_users = Users.query.all()

    # Manually serialize each user object into a dictionary
    users_list = []
    for user in all_users:
        user_data = {
            'id': user.id,
            'name': user.name,
            'branch': user.branch,
            'username': user.username,
        }
        users_list.append(user_data)

    # Return the list of users as JSON
    return jsonify(users_list)
