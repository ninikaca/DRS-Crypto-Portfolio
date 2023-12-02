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

    def serialize(self):
        return {
            "id":self.id,
            "ime":self.ime,
            "prezime":self.prezime,
            "adresa":self.adresa,
            "grad":self.grad,
            "drzava":self.drzava,
            "telefon":self.telefon,
            "email":self.email,
            "lozinka":self.lozinka
        }
        

Base.metadata.create_all(engine)