import requests
from sqlalchemy.orm import Session
from .schemas import ProductCreate
from .crud import create_product
from .seed import CATEGORIES

def import_products_from_api(db: Session):
    url = "https://fakestoreapi.com/products"
    response = requests.get(url)
    if response.status_code == 200:
        products = response.json()
        for item in products:
            if item['category'] in CATEGORIES:
                prod = ProductCreate(
                    title=item['title'],
                    description=item['description'],
                    price=item['price'],
                    category=item['category'],
                    image=item['image'],
                    rate=item['rating']['rate'],
                    count=item['rating']['count']
                )
                create_product(db, prod)
        print("✔ Productos importados exitosamente.")
    else:
        print("❌ Error al obtener los productos.")
