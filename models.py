from app import db

class Players(db.Model):        
    username = db.Column(db.String(30), primary_key=True)
    score = db.Column(db.Integer, nullable=False)
    
    def __repr__(self):
         return '<Players %r>' % self.username