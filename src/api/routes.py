"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token,get_jwt_identity, jwt_required,  JWTManager
from flask_bcrypt import Bcrypt


api = Blueprint('api', __name__)

CORS(api, resources={r"/api/*": {"origins": "*"}})
bcrypt = Bcrypt()


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    user = User.query.filter_by(email=email).first()  


    
    if user is None or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"msg": "Bad email or password"}), 401

    
    userInfo = user.serialize()
    access_token = create_access_token(identity=email)
    
    return jsonify(access_token=access_token, user=userInfo), 200

@api.route("/signup", methods=["POST"])
def register():

    try:
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        name = request.json.get("name", None)
        lastname = request.json.get("lastname", None)
        phone = request.json.get("phone", None)
        address = request.json.get("address", None)
        city = request.json.get("city", None)
        state = request.json.get("state", None)
        zipcode = request.json.get("zipcode", None)
        birthday = request.json.get("birthday", None)
        is_active = request.json.get("is_active", None)
        role = request.json.get("role", None)

        if email is None:
            return jsonify({"msg": "Email is required"}), 400
        if password is None:
            return jsonify({"msg": "Password is required"}), 400
        if name is None:
            return jsonify({"msg": "Name is required"}), 400
        if lastname is None:
            return jsonify({"msg": "Lastname is required"}), 400
        if phone is None:
            return jsonify({"msg": "Phone is required"}), 400
        if address is None:
            return jsonify({"msg": "Address is required"}), 400
        if city is None:
            return jsonify({"msg": "City is required"}), 400
        if state is None:
            return jsonify({"msg": "State is required"}), 400
        if zipcode is None:
            return jsonify({"msg": "Zipcode is required"}), 400
        if birthday is None:
            return jsonify({"msg": "birthday is required"}), 400
        if is_active is None:
            is_active = False
        if role is None:
            role = "user"

        user = User.query.filter_by(email=email).first()
        if user is not None:
            return jsonify({"msg": "User already exists"}), 401
        pw_hash = bcrypt.generate_password_hash(password).decode("utf-8")  
        user = User(email=email, password=pw_hash, name=name, lastname=lastname, phone=phone, address=address, city=city, state=state, zipcode=zipcode, birthday=birthday, is_active=is_active, role=role)
        print(user)
        db.session.add(user)
        db.session.commit()

        return jsonify(user.serialize()), 201

    except Exception as e:
        return jsonify({"msg": "Bad request"}), 500

@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()

    if current_user is None:
        return jsonify({"msg": "Missing Authorization Header"}), 401
    
    return jsonify(current_user), 200


@api.route("/admin", methods=["GET"])
@jwt_required()
def protected_admin():
    current_user = get_jwt_identity()

    if current_user is None:
        return jsonify({"msg": "Missing Authorization Header"}), 401
    
    return jsonify(current_user), 200