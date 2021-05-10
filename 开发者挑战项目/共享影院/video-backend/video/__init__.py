from flask import Flask
from flask_api import FlaskAPI
from .api import views
from flask_cors import CORS

def create_app(config_name):
    app = FlaskAPI(__name__)
    CORS(app)
    app.register_blueprint(views.api)

    return app