from flask import Flask

from .main_routes import main_routes
from .config import secret_key


app = Flask(__name__)
app.secret_key = secret_key


app.register_blueprint(main_routes)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")