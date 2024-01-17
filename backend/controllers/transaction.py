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

def delete_crypto(user_id, currency):
    try:
        transactions = db.session.query(Transaction).filter(Transaction.user_id == user_id, Transaction.currency == currency).all()

        if not transactions:
            return False
        
        for transaction in transactions:
            db.session.delete(transaction)

        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        return False

def create_sale_transaction(transaction):
    try:
        transactions = db.session.query(Transaction.currency, Transaction.type, func.sum(Transaction.amount_paid_dollars)) \
            .filter(Transaction.user_id == transaction.user_id, Transaction.currency == transaction.currency) \
            .group_by(Transaction.type, Transaction.currency) \
            .all()

        if not transactions: # ne moze da proda kripto valutu koju ni nema u portofolio
            return False

        count_of = len(transactions)
        my_balance = 0.0

        if count_of == 1: # ima samo kupovinu onda je stanje u stvari total amount
            #   0         1         2                   
            # ('BTC', 'bought', Decimal('420.0000'))  // transacrions[0]
            # ('BTC', 'sold', Decimal('12.0000'))     // transcation[1]
            my_balance = float(transactions[0][2])
        elif count_of == 2: # ima i kupovina i prodaja
            array = []
            for tr in transactions:
                array.append(float(tr[2]))
            
            my_balance = abs(array[0] - array[1])

        # da li prodaje vise nego sto ima na stanju
        if float(transaction.amount_paid_dollars) > my_balance:
            return False

        db.session.add(transaction)
        db.session.commit()
        return True
    except Exception as e:
        print(e)
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
        transactions = db.session.query(Transaction.currency, func.sum(Transaction.amount_paid_dollars), Transaction.type) \
                        .filter(Transaction.user_id == user_id) \
                        .group_by(Transaction.currency, Transaction.type) \
                        .all()
        
        portfolio = {}

        # sada prolazis redom kroz valute i sabiras sve amount po valuti
        # npr amount 50 i amount 120 za BHD je 170 za BHD
        for transaction in transactions:
            row_dict = {'currency': transaction[0], 'total_amount': transaction[1], 'type': transaction[2]} # (BHD, 100) --> {'currency': 'BHD', 'total_amount': 100 } - ovo je pajton element recnika!
            row_dict['total_amount'] = convert_currency(row_dict['total_amount'], "USD", "EUR") # pretvoris iz dolara u evre zbog kripto apija jer daje sve u evrima tj u odnosu na kurs evra

            # sada iz EUR pretvoriti u realno stanje u kriptu
            from services.cryptoCurrencyConverter import convert_crypto_currency
            row_dict['total_amount'] = convert_crypto_currency(row_dict['total_amount'], row_dict['currency'])

            # ako je kupio ide + na ukupno, u suprotnom prodao znaci oduzima se
            if row_dict['type'] == "sold":
                row_dict['total_amount'] = -row_dict['total_amount'] # oduzima
            
            if row_dict['currency'] in portfolio:
                # If the currency already exists in the portfolio, update the total_amount
                portfolio[row_dict['currency']]['total_amount'] += row_dict['total_amount']
            else:
                # If the currency doesn't exist, add a new entry in the portfolio
                portfolio[row_dict['currency']] = row_dict
        
        return portfolio
    except Exception as e:
        return None

def delete_transcation_by_id(transaction_id):
    try:
        transaction = db.session.query(Transaction).get(transaction_id)

        if not transaction:
            return False
        
        db.session.delete(transaction)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        return False

def find_max_id():
    try:
        # SELECT COALESCE(MAX(id), 0) FROM transactions;
        return db.session.query(func.coalesce(func.max(Transaction.id), 0)).scalar()
    except Exception as e:
        return 0