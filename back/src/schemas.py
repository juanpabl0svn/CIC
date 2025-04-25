from pydantic import BaseModel
from typing import Optional

class ProductBase(BaseModel):
    title: str
    description: str
    price: float
    category: str
    image: str
    rate: float
    count: int

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int

    class Config:
        orm_mode = True
