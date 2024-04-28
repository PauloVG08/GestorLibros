from controller import controllerLibro
from model.Book import Libro
from typing import List
from api.loginApi import app


# API para crear un libro
@app.post("/libros/save")
def crear_libro(libro: Libro):
    if libro.id == 0:
        libro = controllerLibro.crear_libro(libro)
        return {"result": libro}
    else:
        print(libro.derechos_autor)
        libro = controllerLibro.update_libro(libro, libro.id)
        return {"result": libro}


# API para obtener todos los libros
@app.get("/libros/getall")
def obtener_todos_los_libros():
    try:
        libros= controllerLibro.getAllBooks()
        return libros
    except:
        return "Error Al obtener el Libro"


# API para obtener todos los libros
@app.get("/libros/platforms/getall")
def obtener_todos_los_libros():
    libros= controllerLibro.getBooks()
    return libros


@app.post("/libros/update/{libro_id}")
def actualizar_libro(libro_id: int, libro_actualizado: Libro):
    try:
        libro_actualizado = controllerLibro.update_libro(libro_actualizado, libro_id)
        return libro_actualizado
    except:
        return "Error Al Crear el Libro"

@app.post("/libros/delete/{libro_id}")
def actualizar_libro(libro_id: int):
    try:
        libro_actualizado = controllerLibro.delete_libro(libro_id)
        return libro_actualizado
    except:
        return "Error Al Crear el Libro"