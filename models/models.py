import uuid

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import UUID

# Initialize SQLAlchemy
db = SQLAlchemy()


# user model
class Users(db.Model):
    __name__ = 'users'
    id = db.Column(UUID(as_uuid=True), primary_key=True, unique=True, default=uuid.uuid4)
    user_id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    name = db.Column(db.String(80), nullable=False)
    branch = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(120), nullable=False)  # arc user name
    isAdmin = db.Column(db.Boolean, default=False)
    # Establish a relationship with Users model
    # updated_by = db.relationship('Users', backref='master_fruit_list')  # 'backref' creates a reverse link


# Categories model
class Categories(db.Model):
    __name__ = 'categories'
    id = db.Column(UUID(as_uuid=True), primary_key=True, unique=True, default=uuid.uuid4)
    name = db.Column(db.String(50), unique=True, nullable=False)


class Feedback(db.Model):
    __name__ = 'feedback'
    id = db.Column(UUID(as_uuid=True), primary_key=True, unique=True, default=uuid.uuid4)
    user_id = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String)
    category = db.Column(db.String, nullable=False)
    # Foreign key linking to user_id in the Users table
    # last_updated_by = db.Column(db.Integer, db.ForeignKey('users.user_id'))

# MasterFruits model
class MasterFruitsList(db.Model):
    __name__ = 'master_fruits_list'
    id = db.Column(UUID(as_uuid=True), primary_key=True, unique=True, default=uuid.uuid4)
    name = db.Column(db.String(50), unique=True, nullable=False)
    icon = db.Column(db.String(25))
    isAvailable = db.Column(db.Boolean, default=False)
    last_updated_by = db.Column(db.Integer, db.ForeignKey('users.user_id'))

# MasterStationary model
class MasterStationaryList(db.Model):
    __name__ = 'master_stationary_list'
    id = db.Column(UUID(as_uuid=True), primary_key=True, unique=True, default=uuid.uuid4)
    name = db.Column(db.String(50), unique=True, nullable=False)
    icon = db.Column(db.String(25))
    isAvailable = db.Column(db.Boolean, default=False)
    last_updated_by = db.Column(db.Integer, db.ForeignKey('users.user_id'))