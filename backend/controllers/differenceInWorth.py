from config import db
from models.differenceInWorth import DifferenceInWorth
    
def create_difference_entry(new_entry):
    try:
        # prvo proveri da li postoji par korisnik kripto valuta
        is_difference_entry_exists = db.session.query(DifferenceInWorth) \
                .filter(DifferenceInWorth.user_id == new_entry.user_id, DifferenceInWorth.currency == new_entry.currency).first()

        if is_difference_entry_exists is not None: # znaci postoji, znaci treba azurirati
            is_difference_entry_exists.difference = new_entry.difference
            db.session.commit()
        else:
            db.session.add(new_entry)
            db.session.commit()

        return True
    except Exception as e:
        db.session.rollback()
        return False
    
def get_difference_by_user_id_currency(user_id, currency):
    try:
        row = db.session.query(DifferenceInWorth).filter(DifferenceInWorth.user_id == user_id, DifferenceInWorth.currency == currency).scalar()
        if row is not None:
            return row.difference
        else:
            return 0.0
    except Exception as e:
        return 0.0