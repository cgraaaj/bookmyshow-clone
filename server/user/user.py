from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import unset_jwt_cookies
from common.getdb import con


user = Blueprint("user", __name__)


@user.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    cur = con.cursor()
    if not data or not data["username"] or not data["password"]:
        return jsonify({"message": "could not register user"}), 400
    hased_pass = generate_password_hash(data["password"], method="sha256")
    try:
        cur.execute(
            "INSERT INTO user(name,username,password)values(?,?,?)",
            (data["name"], data["username"], hased_pass),
        )
        con.commit()
        return jsonify({"message": f"New user, {data['username']} has been created"})
    except:
        print("could not register user in db")
        return jsonify({"message": "could not register user"}), 400


@user.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    cur = con.cursor()
    if not data or not data["username"] or not data["password"]:
        return {"message": "Could not verify invalid username/password"}, 401
    try:
        cur.execute("SELECT * FROM user WHERE username = ?", [data["username"]])
        user = cur.fetchone()
        print(user)
        if not user:
            return {"message": "User not Found"}, 404
        if check_password_hash(user[3], data["password"]):
            access_token = create_access_token(
                identity=data["username"],
                additional_claims={"username": data["username"]},
            )
            response = jsonify(
                {"msg": "login successful", "access_token": access_token}
            )
            return response
    except Exception as e:
        print("could not verify, exception:", e)
        return {"message": "Could not verify"}, 401


@user.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response
