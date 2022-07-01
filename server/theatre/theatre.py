from re import T
from flask import Blueprint
from common.utils import theatre
from flask_jwt_extended import jwt_required

theatr = Blueprint("theatre", __name__)


@theatr.route("/theatre", methods=["GET"])
@jwt_required()
def get_show_details():
    try:
        return theatre
    except Exception as e:
        print("Excepton:", e)
        return {"message": "Could not load theatre"}, 401


@theatr.route("/theatre/<path:movie_id>", methods=["GET"])
@jwt_required()
def get_show_detail(movie_id):
    show_detail = {}
    try:
        for x in theatre["data"]:
            for k, v in x.items():
                if movie_id == v:
                    show_detail = x
        return show_detail
    except Exception as e:
        print("Excepton:", e)
        return {"message": "Could not load theatre"}, 401
