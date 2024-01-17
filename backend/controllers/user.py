from config import db
from models.user import User
from models.profit import Profit
from controllers.profit import create_entry

def create_user(name, surname, address, city, country, number, email, password):
    try:
        # Check if the user with the given email already exists
        existing_user = db.session.query(User).filter(User.email == email).first()

        if existing_user:
            # User with the same email already exists, handle accordingly
            return False  # For example, you can return an error message

        # Create a new user
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

        # Retrieve the newly created user's ID
        new_id = new_user.id

        # Create a corresponding entry in the Profit table
        if create_entry(Profit(user_id=new_id, summary=0.0, type="profit")):
            return True
        else:
            return False

    except Exception as e:
        print(e)
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
    
