from flask import Flask
from flask_cors import CORS
from waitress import serve
from flask_jwt_extended import JWTManager
import os
from datetime import timedelta
from dotenv import load_dotenv
from user.user import user
from movies.movies import movie
from theatre.theatre import theatr
from common.getdb import con

app = Flask(__name__)

jwt = JWTManager(app)
app.config["JWT_SECRET_KEY"] = "super-dooper-secret"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=3)

app.register_blueprint(user, url_prefix="/user")
app.register_blueprint(movie)
app.register_blueprint(theatr)

CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


cur = con.cursor()
cur.execute(
    "CREATE TABLE IF NOT EXISTS user(pid integer primary key,name text,username text,password text)"
)
cur.execute("DROP TABLE IF EXISTS historical_prices ")

if __name__ == "__main__":

    LOCATE_PY_DIRECTORY_PATH = os.path.abspath(os.path.dirname(__file__))
    load_dotenv("{}/.env".format(LOCATE_PY_DIRECTORY_PATH))
    port = 5000
    if os.getenv("FLASK_ENV") == "development":
        app.run(port=port, host="0.0.0.0", debug=True)
    else:
        serve(app, host="0.0.0.0", port=port)
