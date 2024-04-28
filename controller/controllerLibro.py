import mysql
from controller.bd.conexion import startConexion
from model.Book import Libro
import requests
from model.University import University

def crear_libro(libro: Libro):
        conexion, cursor = startConexion()

        if conexion is not None:
            cursor = conexion.cursor()
            consulta = "INSERT INTO libro (titulo, autor, genero, idioma, anio_publicacion, derechos_autor, pdf_base64) VALUES (%s, %s, %s, %s,%s, %s, %s)"
            valores = (libro.titulo, libro.autor, libro.genero, libro.idioma, libro.anio_publicacion, libro.derechos_autor, libro.pdf_base64)
            cursor.execute(consulta, valores)
            conexion.commit()
            cursor.close()
            conexion.close()
            return True
        else:
            return False

# Función para obtener todos los registros de libros
def getAllBooks():
    try:
        conexion, cursor = startConexion()
        if conexion is not None:
            cursor = conexion.cursor()
            status = 1
            consulta = f"SELECT * FROM libro WHERE status = {status}"
            cursor.execute(consulta)
            libros = []
            resultados = cursor.fetchall()
            for resultado in resultados:
                id, titulo, autor, genero, idioma, anio_publicacion, derechos_autor, pdf_base64, status = resultado
                libro = Libro()
                libro.id = id
                libro.titulo = titulo
                libro.autor = autor
                libro.genero = genero
                libro.idioma = idioma
                libro.anio_publicacion = anio_publicacion
                libro.derechos_autor = derechos_autor
                libro.pdf_base64 = pdf_base64
                libro.status = status
                libros.append(libro)
            return libros
        else:
            print("No se pudo establecer la conexión a la base de datos")
            return []
    except mysql.connector.Error as error:
        cursor.close()
        conexion.close()
        print("Error al obtener los libros:", error)
        return []
    finally:
        if conexion is not None:
            cursor.close()
            conexion.close()

def getUniversities():
    ## libros = getAllBooks()
    conexion, cursor = startConexion()
    try:
        consulta = f"SELECT * FROM universidad"
        cursor.execute(consulta)
        universidades = []
        resultados = cursor.fetchall()

        for universidad in resultados:
            uni = University()
            uni.id = universidad[0]
            uni.dominio = universidad[1]
            uni.getall = universidad[2]
            uni.nombre = universidad[3]
            universidades.append(uni)
        return universidades
    except:
        cursor.close()
        conexion.close()
        return "Error al encontrar las universidades"

def getBooks():
    domains = getUniversities()
    libros = getAllUnivesities(domains)
    return libros

def getAllUnivesities(domains):
    libros = getAllBooks()
    for uni in domains:
            url = uni.dominio + uni.getall
            # university_name = uni.name
            try:
                response = requests.get(url)
                if response.status_code == 200:
                    # El contenido de la respuesta está en formato JSON
                    data = response.json()
                    for lib in data:
                        lib["titulo"] = f'{lib["titulo"]}-{uni.nombre}'
                    libros += data
            except:
                continue
    return libros


def update_libro(libro_actualizado: Libro, libro_id: int):
    try:
        conexion, cursor = startConexion()
        if conexion is not None:
            cursor = conexion.cursor()
            consulta = "UPDATE libro SET titulo = %s, autor = %s, genero = %s, idioma = %s, anio_publicacion = %s, derechos_autor = %s, pdf_base64 = %s WHERE id = %s"
            valores = (libro_actualizado.titulo, libro_actualizado.autor, libro_actualizado.genero, libro_actualizado.idioma, libro_actualizado.anio_publicacion, libro_actualizado.derechos_autor, libro_actualizado.pdf_base64, libro_id)
            cursor.execute(consulta, valores)
            conexion.commit()
            conexion.close()
            return libro_actualizado
        else:
            print("No se pudo establecer la conexión a la base de datos")
            return []
    except mysql.connector.Error as error:
        print("Error al obtener los libros:", error)
        return []
    finally:
        if conexion is not None:
            cursor.close()
            conexion.close()

def delete_libro(libro_id: int):
    try:
        conexion, cursor = startConexion()
        if conexion is not None:
            cursor = conexion.cursor()
            consulta = "UPDATE libro SET status = %s WHERE id = %s"
            valores = (0, libro_id)
            cursor.execute(consulta, valores)
            conexion.commit()
            cursor.close()
            conexion.close()
            return True
        else:
            print("No se pudo establecer la conexión a la base de datos")
            return False

    except mysql.connector.Error as error:
        print("Error al obtener los libros:", error)
        return False
    finally:
        if conexion is not None:
            cursor.close()
            conexion.close()
