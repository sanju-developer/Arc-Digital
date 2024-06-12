from dotenv import load_dotenv

from flask import Flask
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def index():
    return 'Holla Guys!!'


if __name__ == '__main__':
    app.run(debug=True)
