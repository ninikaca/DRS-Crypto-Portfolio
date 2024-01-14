from config import db
from models.transaction import Transaction

def create(transaction):
    try:
        db.session.add(transaction)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        return False