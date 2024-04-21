import logging
import uuid
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = ('postgresql://hujqswyd:7c_2pkPK0A-Oi5qWR5kfvtoktHkGYeAC@rosie.db.elephantsql.com/hujqswyd')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)


class Users(db.Model):
    id = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, primary_key=True) # arc usre id
    name = db.Column(db.String(80), unique=True, nullable=False)
    branch = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(120), nullable=False) # arc user name
    joining_date = db.Column(db.DateTime, default=datetime.now(timezone.utc))

with app.app_context():
    db.create_all()


class Catergories(db.Model):
    id = db.Column(db.String, nullable=False)
    name = db.Column(db.String(80), unique=True, nullable=False, primary_key=True)
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
            'user_id': user.user_id,
            'username': user.username
        }
        users_list.append(user_data)

    # Return the list of users as JSON
    return jsonify(users_list)


@app.route('/catergories', methods=['GET'])
def arc_catergories():
    # Retrieve all users from the Users table
    all_catergories = Catergories.query.all()

    # Manually serialize each user object into a dictionary
    catergories_list = []
    for catergories in all_catergories:
        catergories_data = {
            'id': catergories.id,
            'name': catergories.name,
        }
        catergories_list.append(catergories_data)

    # Return the list of users as JSON
    return jsonify(catergories_list)


# Route to add multiple users
@app.route('/add_users', methods=['POST'])
def add_arc_users():
    # Parse request data
    data = request.json
    users = data.get('users')

    # Create a list to store new user objects
    new_users = []
    for user_data in users:
        unique_id = uuid.uuid4()
        user_id = user_data.get('user_id')
        name = user_data.get('name')
        branch = user_data.get('branch')
        username = user_data.get('username')

        # Create a new user object and add it to the list
        new_user = Users(id=unique_id, user_id=user_id, name=name, branch=branch, username=username)
        new_users.append(new_user)

    # Add the list of new users to the database session and commit the transaction
    db.session.add_all(new_users)
    db.session.commit()

    return 'Users added successfully'


@app.route('/add_catergories', methods=['POST'])
def add_arc_catergories():
    # Parse request data
    data = request.json
    catergories = data.get('catergories')

    # Create a list to store new categories objects
    new_categories = []
    for category_data in catergories:
        unique_id = uuid.uuid4()
        name = category_data.get('name')

        # Check if the category already exists in the database
        existing_category = Catergories.query.filter_by(name=name).first()
        if existing_category:
            # If the category already exists, skip adding it
            continue

        # Create a new category object
        new_category = Catergories(id=unique_id, name=name)
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
