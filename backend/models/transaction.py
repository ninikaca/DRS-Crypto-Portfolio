from sqlalchemy import Column, Integer, String, Enum, DECIMAL, ForeignKey
from config import Base, engine

class Transaction(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    date_and_time = Column(String(30), nullable=False)
    type = Column(Enum('bought', 'sold'), nullable=False)
    currency = Column(String(5), nullable=False)
    amount_paid_dollars = Column(DECIMAL(10, 4), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "date_and_time": self.date_and_time,
            "type": self.type,
            "currency": self.currency,
            "amount_paid_dollars": float(self.amount_paid_dollars),
        }

Base.metadata.create_all(engine)