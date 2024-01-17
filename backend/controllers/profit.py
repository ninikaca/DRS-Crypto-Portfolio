from config import db
from models.profit import Profit
from models.differenceInWorth import DifferenceInWorth
from controllers.transaction import get_crypto_currencies_by_user, get_transaction_by_user
from controllers.differenceInWorth import create_difference_entry
from sqlalchemy.sql import func
from decimal import Decimal, getcontext

getcontext().prec = 20

def create_entry(new_entry):
    try:
        # prvo proveri da li postoji user_id za taj profit
        is_user_entry_exists = db.session.query(Profit).filter(Profit.user_id == new_entry.user_id).first()

        if is_user_entry_exists is not None: # znaci postoji, znaci treba azurirati
            is_user_entry_exists.summary = new_entry.summary
            is_user_entry_exists.type = new_entry.type
            is_user_entry_exists.net_worth = new_entry.net_worth
        else:
            db.session.add(new_entry)

        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        return False
    
def calculate_portoflio():
    try:
        profits = db.session.query(Profit).all()

        if profits:
            for profit in profits:
                user_id = profit.user_id
                net_worth = 0.0

                # prvo proracunamo net_worth u dolarima
                transcations = get_transaction_by_user(user_id)

                if transcations:
                    for transaction in transcations:
                        if transaction["type"] == "bought":
                            net_worth += transaction["amount_paid_dollars"]
                        else:
                            net_worth += transaction["amount_paid_dollars"]

                # vrednost u kripto valuti za juce i danas
                # element u recniku je
                # row_dict = {'currency': 'BTC', 'total_amount': 0.00023128, 'type': 'bought'}
                user_crypto_portfolio_today = get_crypto_currencies_by_user(user_id)
                user_crypto_portfolio_yesterday = get_crypto_currencies_by_user(user_id, is_yesterday=True)

                ukupna_vrednost_dolari_juce = 0.0
                ukupna_vrednost_dolari_danas = 0.0

                # redosled u oba recnika je isti!
                # u tabelu worthdifference upisati nove vrednosti
                for today_entry in user_crypto_portfolio_today:                  
                    currency = today_entry
                    today_amount = user_crypto_portfolio_today[currency]['total_amount']

                    # Find the corresponding entry in yesterday's portfolio
                    yesterday_amount = user_crypto_portfolio_yesterday[currency]['total_amount']
                    difference = Decimal(round(Decimal(today_amount) - Decimal(yesterday_amount), 10))

                    # to su amount-i u kripto vrednosti
                    # pretvorimo ih sada nazad u dolare i pamtimo juce i danas u dolarima
                    from services.cryptoCurrencyConverter import convert_crypto_to_dollars
                    ukupna_vrednost_dolari_juce += convert_crypto_to_dollars(Decimal(yesterday_amount), currency)
                    ukupna_vrednost_dolari_danas += convert_crypto_to_dollars(Decimal(today_amount), currency)

                    # Create a new DifferenceInWorth entry
                    new_difference = DifferenceInWorth(
                        user_id=user_id,
                        currency=currency,
                        difference= difference
                    )

                    # function that adds the new entry to the database
                    create_difference_entry(new_difference)

                # izracunati razliku danas - juce
                net_worth_danas = ukupna_vrednost_dolari_danas
                razlika = ukupna_vrednost_dolari_danas - ukupna_vrednost_dolari_juce
                type = ""

                if razlika < 0.0:
                    type = "loss"
                else:
                    type = "profit"

                new_entry_profit = Profit(
                    user_id = user_id,
                    type=type,
                    net_worth=net_worth_danas,
                    summary=razlika
                )

                # write summary to profit table
                create_entry(new_entry_profit)

        db.session.commit()
    except Exception as e:
        db.session.rollback()

def get_summary_by_user_id(user_id):
    try:
        return db.session.query(Profit).filter(Profit.user_id == user_id).scalar()
    except Exception as e:
        return None