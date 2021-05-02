from flask import Blueprint
from flask_cors import CORS

api = Blueprint('api', __name__, url_prefix='/video')
CORS(api)
from video.api import views, errors