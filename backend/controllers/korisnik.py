from config import db
from models.korisnik import Korisnik

def kreiraj_korisnika(ime, prezime, adresa, grad, drzava, telefon, email, lozinka):
    try:
        new_korisnik = Korisnik(
            ime=ime,
            prezime=prezime,
            adresa=adresa,
            grad=grad,
            drzava=drzava,
            telefon=telefon,
            email=email,
            lozinka=lozinka
        )

        db.session.add(new_korisnik)
        db.session.commit()
        return True

    except Exception as e:
        db.session.rollback()
        return False
    

def proveri_korisnika(email, lozinka):
    korisnik = db.session.query(Korisnik).filter(Korisnik.email == email, Korisnik.lozinka == lozinka).first()
    return korisnik is not None

def pribavi_korisnika(email):
    korisnik = db.session.query(Korisnik).filter(Korisnik.email == email).first()
    return korisnik

def izmeni_korisnika(id, ime, prezime, adresa, grad, drzava, telefon, email, lozinka):
    try:
        korisnik = db.session.query(Korisnik).get(id)

        if korisnik is not None:
            korisnik.ime = ime
            korisnik.prezime = prezime
            korisnik.adresa = adresa
            korisnik.grad = grad
            korisnik.drzava = drzava
            korisnik.telefon = telefon
            korisnik.email = email
            korisnik.lozinka = lozinka  
            db.session.commit()
            return True
        else:
            return False

    except Exception as e:
        db.session.rollback()
        return False