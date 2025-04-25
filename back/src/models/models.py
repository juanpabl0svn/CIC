from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base


class Producto(Base):
    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True, unique=True)
    precio = Column(Integer)
    categoria_id = Column(Integer, ForeignKey("categoria_productos.id"))

    categoria = relationship("CategoriaProducto", back_populates="productos")
