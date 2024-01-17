from sqlalchemy import Column, Integer, Enum, DECIMAL, ForeignKey
from config import Base, engine

class Profit(Base):
    __tablename__ = 'profits'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    type = Column(Enum('profit', 'loss', name='profit_type'), nullable=False)
    summary = Column(DECIMAL(10, 10), nullable=False, default=0.0)
    net_worth = Column(DECIMAL(10, 5), nullable=False, default=0.0)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "type": self.type,
            "summary": float(self.summary),
            "net_worth": float(self.net_worth)
        }

Base.metadata.create_all(engine)