from config import db
from models.transaction import Transaction
from services.currencyConverter import convert_currency
from sqlalchemy.sql import func

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

def get_crypto_currencies_by_user(user_id):
    try:
        # ovo su sql alchemy tuple, znaci ide (valuta, totalno klk ima)
        transactions = db.session.query(Transaction.currency, func.sum(Transaction.amount_paid_dollars)) \
                        .filter(Transaction.user_id == user_id) \
                        .group_by(Transaction.currency) \
                        .all()
        
        portfolio = {}

        # sada prolazis redom kroz valute i sabiras sve amount po valuti
        # npr amount 50 i amount 120 za BHD je 170 za BHD
        for transaction in transactions:
            row_dict = {'currency': transaction[0], 'total_amount': transaction[1]} # (BHD, 100) --> {'currency': 'BHD', 'total_amount': 100 } - ovo je pajton element recnika!
            row_dict['total_amount'] = convert_currency(row_dict['total_amount'], "USD", "EUR") # pretvoris iz dolara u evre zbog kripto apija jer daje sve u evrima tj u odnosu na kurs evra
            portfolio[row_dict['currency']] = row_dict # dodas ga u recnik po kljucu valute
        
        return portfolio
    except Exception as e:
        return None