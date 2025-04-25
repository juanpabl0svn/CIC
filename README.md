# Prueba Técnica – CRUD de Productos con FastAPI y Angular

Este proyecto es una prueba técnica que implementa un CRUD completo de productos consumiendo la API [http://localhost:8000/products](http://localhost:8000/products).

## Tecnologías utilizadas

- **FastAPI** (Python) – Backend
- **Angular 17+** – Frontend
- **Tailwind CSS** – Estilos
- **MySQL** – Base de datos
- **Docker** – Contenedores

## Funcionalidades

- Visualizar, crear, editar y eliminar productos
- Búsqueda en tiempo real
- Formularios con validación básica
- Notificaciones con `@ngxpert/hot-toast`
- Modal para crear/editar productos

## Posibles mejoras

- Validaciones más robustas usando librerías como Zod
- Autenticación con roles y permisos
- Protección de rutas usando tokens JWT
- Mejor organización del código para escalar el proyecto
- Mejor diseño visual


## Ejecución del Proyecto 🚀

Puedes ejecutar este proyecto de dos maneras: usando Docker para levantar todo el entorno o ejecutando los proyectos de manera independiente. Aquí te explico ambas opciones.

### Opción 1: Usando Docker 🐳

Con Docker, puedes iniciar tanto el frontend como el backend junto con la base de datos en un solo paso. Para hacerlo, solo necesitas ejecutar el siguiente comando en la raíz del proyecto:

```bash
docker-compose up --build
```

### Opción 2: Ejecutando individualmente

#Front
```bash
ng s
```

#Back
```bash
 uvicorn src.main:app --reload
```


