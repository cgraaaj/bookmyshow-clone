from flask import Blueprint
from common.utils import movies
from flask_jwt_extended import jwt_required

movie = Blueprint("movies", __name__)


@movie.route("/movies", methods=["GET"])
@jwt_required()
def get_movies():
    try:
        return movies
    except Exception as e:
        print("Excepton:", e)
        return {"message": "Could not load movies"}, 401
