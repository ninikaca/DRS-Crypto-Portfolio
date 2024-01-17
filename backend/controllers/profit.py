from config import db
from models.profit import Profit
from sqlalchemy.sql import func
    
def create_entry(new_entry):
    try:
        # prvo proveri da li postoji user_id za taj profit
        is_user_entry_exists = db.session.query(Profit).filter(Profit.user_id == new_entry.user_id).first()

        if is_user_entry_exists is not None: # znaci postoji, znaci treba azurirati
            is_user_entry_exists.summary = new_entry.summary
            is_user_entry_exists.type = new_entry.type
        else:
            db.session.add(new_entry)

        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        return False
    
def calculate_portoflio():
    try:
        

        db.session.commit()
    except Exception as e:
        db.session.rollback()