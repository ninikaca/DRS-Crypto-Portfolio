from sqlalchemy import Column, Integer, String
from config import Base, engine

class Korisnik(Base):
    __tablename__ = 'korisnici'

    id = Column(Integer, primary_key=True, autoincrement=True)
    ime = Column(String(255), nullable=False)
    prezime = Column(String(255), nullable=False)
    adresa = Column(String(255), nullable=False)
    grad = Column(String(255), nullable=False)
    drzava = Column(String(100), nullable=False)
    telefon = Column(String(20), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    lozinka = Column(String(255), nullable=False)

Base.metadata.create_all(engine)