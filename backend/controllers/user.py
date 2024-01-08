from config import db
from models.user import User

def create_user(name, surname, address, city, country, number, email, password):
    try:
        new_user = User(
            name=name,
            surname=surname,
            address=address,
            city=city,
            country=country,
            number=number,
            email=email,
            password=password
        )

        db.session.add(new_user)
        db.session.commit()
        return True

    except Exception as e:
        db.session.rollback()
        return False
    

def check_user(email, password):
    user = db.session.query(User).filter(User.email == email, User.password == password).first()
    return user is not None

def get_user(email):
    user = db.session.query(User).filter(User.email == email).first()
    return user

def edit_user(id, name, surname, address, city, country, number, email, password):
    try:
        user = db.session.query(User).get(id)

        if user is not None:
            user.name = name
            user.surname = surname
            user.address = address
            user.city = city
            user.country = country
            user.number = number
            user.email = email
            user.password = password  
            db.session.commit()
            return True
        else:
            return False

    except Exception as e:
        db.session.rollback()
        return False