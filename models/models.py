from flask_sqlalchemy import SQLAlchemy

# Initialize SQLAlchemy
db = SQLAlchemy()


# user model
class Users(db.Model):
    __name__ = 'users'
    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    name = db.Column(db.String(80), nullable=False)
    branch = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(120), nullable=False)  # arc user name


# Categories model
class Categories(db.Model):
    __name__ = 'categories'
    cid = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    name = db.Column(db.String(50), unique=True, nullable=False)


# Fruits model
class Fruits(db.Model):
    __name__ = 'fruits'
    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    name = db.Column(db.String(50), unique=True, nullable=False)
    isAvailable = db.Column(db.Boolean, default=True)
    cid = db.Column(db.Integer, db.ForeignKey('categories.cid'))  # Foreign key to Categorize
    category = db.relationship('Categories', backref='fruits')


# Stationary model
class Stationary(db.Model):
    __name__ = 'stationary'
    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    name = db.Column(db.String(50), unique=True, nullable=False)
    isAvailable = db.Column(db.Boolean, default=True)
    cid = db.Column(db.Integer, db.ForeignKey('categories.cid'))  # Foreign key to Categorize
    category = db.relationship('Categories', backref='stationary')


class Feedback(db.Model):
    __name__ = 'feedback'
    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String)
    category = db.Column(db.String, nullable=False)


# MasterFruits model
class MasterFruitsList(db.Model):
    __name__ = 'master_fruits_list'
    id = db.Column(db.String, primary_key=True, unique=True, nullable=False)
    name = db.Column(db.String(50), unique=True, nullable=False)
    icon = db.Column(db.String(25))


# MasterStationary model
class MasterStationaryList(db.Model):
    __name__ = 'master_stationary_list'
    id = db.Column(db.String, primary_key=True, unique=True, nullable=False)
    name = db.Column(db.String(50), unique=True, nullable=False)
    icon = db.Column(db.String(25))
