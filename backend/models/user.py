from sqlalchemy import Column, Integer, String
from config import Base, engine

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    surname = Column(String(255), nullable=False)
    address = Column(String(255), nullable=False)
    city = Column(String(255), nullable=False)
    country = Column(String(100), nullable=False)
    number = Column(String(20), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(255), nullable=False)

    def serialize(self):
        return {
            "id":self.id,
            "name":self.name,
            "surname":self.surname,
            "address":self.address,
            "city":self.city,
            "country":self.country,
            "number":self.number,
            "email":self.email,
            "password":self.password
        }
        

Base.metadata.create_all(engine)