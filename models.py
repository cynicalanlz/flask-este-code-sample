from app import db
from sqlalchemy.dialects.postgresql import JSON

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(), nullable=False)
    profile = db.Column(JSON)

    def __init__(self, username, profile):
        self.username = username
        self.profile = profile

    def __repr__(self):
        return '<id {}>'.format(self.id)