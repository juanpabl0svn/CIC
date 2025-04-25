from sqlalchemy import Column, Integer, String, Float
from .database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    description = Column(String(1000))
    price = Column(Float)
    category = Column(String(100))
    image = Column(String(500))
    rate = Column(Float)
    count = Column(Integer)
