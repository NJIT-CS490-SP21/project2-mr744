'''
Author: Mihir Rana
Date: 3/14/2021
'''

# pylint: disable= E1101, C0413, R0903, W0603, W1508
from app import db


class Players(db.Model):
    ''' Players table '''
    username = db.Column(db.String(30), primary_key=True)
    score = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Players %r>' % self.username
