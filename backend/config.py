from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

#izmeni ip add na svoju
SQLALCHEMY_DATABASE_URI = f'mysql+mysqlconnector://root:123@172.21.64.1:3306/sqlbaza?charset=utf8mb4'

SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = False
DEBUG = True

engine = create_engine(SQLALCHEMY_DATABASE_URI, echo=False)
Base = declarative_base()
db = SQLAlchemy()