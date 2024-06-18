from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

from backend.models.models import db

from backend.blueprints.feedback import feedback_bp
from backend.blueprints.orders import orders_bp
from backend.blueprints.users import users_bp
from backend.blueprints.fruits import fruits_bp
from backend.blueprints.stationary import stationary_bp

load_dotenv()
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Database configuration
# Configure the SQLAlchemy part of the app instance
database_url = os.getenv('DATABASE_URL')
if not database_url:
    raise ValueError("No DATABASE_URL set for Flask application")
app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database with the Flask app
db.init_app(app)

# Create all tables in the database
with app.app_context():
    db.create_all()

# Register the blueprints
app.register_blueprint(fruits_bp, url_prefix='/api')
app.register_blueprint(stationary_bp, url_prefix='/api')
app.register_blueprint(users_bp, url_prefix='/api')
app.register_blueprint(feedback_bp, url_prefix='/api')
app.register_blueprint(orders_bp, url_prefix='/api')

@app.route('/')
def index():
    return 'Holla Guys!!'


if __name__ == '__main__':
    app.run(port=5001, debug=True)
