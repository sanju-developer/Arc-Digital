from dotenv import load_dotenv
import os

from flask import Flask

from blueprints.feedback import feedback_bp
from blueprints.users import users_bp
from models.models import db
from blueprints.categories import category_bp
from blueprints.fruits import fruits_bp
from blueprints.stationary import stationary_bp

app = Flask(__name__)
load_dotenv()


# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database with the Flask app
db.init_app(app)

# Create all tables in the database
with app.app_context():
    db.create_all()

# Register the blueprints
app.register_blueprint(category_bp, url_prefix='/api')
app.register_blueprint(fruits_bp, url_prefix='/api')
app.register_blueprint(stationary_bp, url_prefix='/api')
app.register_blueprint(users_bp, url_prefix='/api')
app.register_blueprint(feedback_bp, url_prefix='/api')

@app.route('/')
def index():
    return 'Hello, Arcesium!!'


if __name__ == '__main__':
    app.run(port=8000, debug=True)
