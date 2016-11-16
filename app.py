from flask import Flask, render_template, request, redirect, flash
from flask.ext.sqlalchemy import SQLAlchemy
from flask_restful import reqparse, abort, Api, Resource
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
import os
from config import Config
import json

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
engine = create_engine(Config.SQLALCHEMY_DATABASE_URI, convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
										 autoflush=False,
										 bind=engine))

from models import *

# class UserResource(Resource):
#     def get(self, todo_id):
#     	u = User.query.filter_by(username='peter').first()
#         return {todo_id: todos[todo_id]}

#     def put(self, todo_id):
#     	# u = User('admin', 'admin@admin.ru', {})
# 		# db_session.add(u)
# 		# db_session.commit()
#         todos[todo_id] = request.form['data']
#         return {todo_id: todos[todo_id]}

# api.add_resource(TodoSimple, '/api/user/<string:todo_id>')

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

from wtforms import Form, BooleanField, StringField, PasswordField, validators


class RegistrationForm(FlaskForm):
	email = StringField(
		'Email Address',
		[validators.Length(min=4, max=255)],
		render_kw={
			"class": "form-control",
			"id": "email"
		}
	)
	password = PasswordField(
		'New Password', 
		[
		validators.DataRequired(),
		validators.EqualTo('confirm', message='Passwords must match')
		], 
		render_kw={
			"class": "form-control",
			"id": "password"
		})
	confirm = PasswordField(
		'Repeat Password',
		render_kw={
			"class": "form-control",
			"id": "password"
		})

@app.route('/registration/', methods=['GET', 'POST'])
def add_user():
	form = RegistrationForm(request.form)

	if request.method == "POST" and form.validate():
		data = dict(request.form)
		profile = {}
		keys = list(data.keys())
		skip = ['email', 'password', 'csrf_token', 'confirm']
		for key in keys:
			if key not in skip:
				it = data[key]
				if len(it)>1:
					profile[key] = data[key]
				else:
					if data[key][0]!='':
						profile[key] = data[key][0]

		u = User(
			data['email'][0],
			data['password'][0],
			json.dumps(profile)
		)

		db_session.add(u)
		db_session.commit()

		flash('Thanks for registering')
		return redirect("/")

	return render_template('add_user.html', form=form)


@app.route('/user/<int:id>', methods=['GET'])
def user_by_id(id):
	u = User.query.get(id)
	if not u:
		abort(404)

	if u.profile != '':
		profile = json.loads(u.profile)
	else:
		profile = {}

	return render_template(
		"profile.html", 
		profile=profile,
		date=u.created_date, 
		name=u.email
		)


@app.route('/', methods=['GET'])
def users():
	unames = [item for item in User.query.order_by("created_date desc").limit(10).all()]

	if len(unames) == 0:
		return redirect("/registration/")

	return render_template("users_list.html", users=unames)


# @app.route('/', methods=['GET', 'POST'])
# def index():
# 	return render_template('index.html')

if __name__ == '__main__':
	app.run()
