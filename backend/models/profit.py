from sqlalchemy import Column, Integer, Enum, DECIMAL, ForeignKey
from config import Base, engine

class Profit(Base):
    __tablename__ = 'profits'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    type = Column(Enum('profit', 'loss', name='profit_type'), nullable=False)
    summary = Column(DECIMAL(10, 10), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "type": self.type,
            "summary": float(self.summary)
        }

Base.metadata.create_all(engine)