from sqlalchemy import Column, Integer, String, DECIMAL, ForeignKey
from config import Base

class DifferenceInWorth(Base):
    __tablename__ = 'DifferenceInWorth'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    currency = Column(String(5), nullable=False)
    difference = Column(DECIMAL(10, 10), nullable=False, default=0.0)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "currency": self.currency,
            "difference": float(self.difference)
        }