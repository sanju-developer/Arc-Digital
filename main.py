import logging
import uuid
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = (
    'postgresql://hujqswyd:7c_2pkPK0A-Oi5qWR5kfvtoktHkGYeAC@rosie.db.elephantsql.com/hujqswyd')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)


class Users(db.Model):
    id = db.Column(db.Integer(), primary_key=True, nullable=False)
    name = db.Column(db.String(80), unique=True, nullable=False)
    branch = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(120), nullable=False)  # arc user name


with app.app_context():
    db.create_all()


class Categories(db.Model):
    id = db.Column(db.String, nullable=False)
    name = db.Column(db.String(80), unique=True, nullable=False, primary_key=True)
    isAvailable = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))


with app.app_context():
    db.create_all()


@app.route('/users', methods=['GET'])
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


@app.route('/categories', methods=['GET'])
def arc_categories():
    # Retrieve all users from the Users table
    all_categories = Categories.query.all()

    # Manually serialize each user object into a dictionary
    categories_list = []
    for category in all_categories:
        categories_data = {
            'id': category.id,
            'name': category.name,
            'isAvailable': category.isAvailable,
            'created_at': category.created_at
        }
        categories_list.append(categories_data)

    # Return the list of users as JSON
    return jsonify(categories_list)


# Route to add multiple users
@app.route('/add_users', methods=['POST'])
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

    # Add the list of new users to the database session and commit the transaction
    db.session.add_all(new_users)
    db.session.commit()

    return 'Users added successfully'


@app.route('/add_categories', methods=['POST'])
def add_arc_categories():
    # Parse request data
    data = request.json
    categories = data.get('categories')

    # Create a list to store new categories objects
    new_categories = []
    for category_data in categories:
        unique_id = uuid.uuid4()
        name = category_data.get('name')
        isAvailable = category_data.get('isAvailable')
        created_at = datetime.now(timezone.utc)

        # Check if the category already exists in the database
        existing_category = Categories.query.filter_by(name=name).first()
        if existing_category:
            # If the category already exists, skip adding it
            continue

        # Create a new category object
        new_category = Categories(id=unique_id, name=name, isAvailable=isAvailable, created_at=created_at)
        new_categories.append(new_category)

    try:
        # Add the list of new categories to the database session and commit the transaction
        db.session.add_all(new_categories)
        db.session.commit()
        return jsonify({"message": "Categories added successfully"}), 201
    except IntegrityError:
        # If a unique constraint violation occurs, roll back the transaction
        db.session.rollback()
        return jsonify({"error": "Duplicate category name"}), 400


@app.route('/')
def index():
    return 'Hello, Arcesium!!'


if __name__ == '__main__':
    app.run(port=8000, debug=True)
