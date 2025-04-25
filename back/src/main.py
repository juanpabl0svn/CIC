from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import database, models, api, importer

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(
    title="CRUD Productos",
    description="API con FastAPI, MySQL y CORS",
    version="1.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # cámbialo para producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas
app.include_router(api.router)


@app.on_event("startup")
def startup_event():
    with database.SessionLocal() as db:
        importer.import_products_from_api(db)
