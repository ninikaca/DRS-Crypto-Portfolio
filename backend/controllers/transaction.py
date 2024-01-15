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

def get_transaction_by_user(user_id):
    try:
        transactions = db.session.query(Transaction).filter(Transaction.user_id == user_id).all()
        return [tra.serialize() for tra in transactions]
    except Exception as e:
        return None