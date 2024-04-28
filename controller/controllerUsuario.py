from controller.bd.conexion import startConexion
from model.user import Usuario

def guardarUsuario(nombre, primer_apellido, segundo_apellido, rol, usuario, contrasenia):
    conexion, cursor = startConexion()
    
    args = (nombre, primer_apellido, segundo_apellido,
            rol, usuario, contrasenia)
    print(args)
    cursor.callproc("libreria.insertarUsuario", args)

    conexion.commit()

    # resultado = cursor.fetchone()

    cursor.close()
    conexion.close()

def actualizarUsuario(id, nombre, primer_apellido, segundo_apellido, rol, usuario, contrasenia):
    conexion, cursor = startConexion()
    
    args = (id, nombre, primer_apellido, segundo_apellido,
            rol, usuario, contrasenia)
    print(args)
    cursor.callproc("libreria.actualizarUsuario", args)

    conexion.commit()

    # resultado = cursor.fetchone()

    cursor.close()
    conexion.close()


#------------------Eliminar Usuario-----------------------
def eliminarUsuario(id:int):
    conexion, cursor = startConexion()

    #consulta = f"DELETE FROM usuario WHERE id ={id}"
    status = 0
    consulta = f'UPDATE usuario SET status = {status}  WHERE id ={id}'

    cursor.execute(consulta)

    conexion.commit()
    cursor.close()
    conexion.close()

#-----------------Actualizar Usuario---------------
def actualizarUsuario(id, nombre, primer_apellido, segundo_apellido, rol, usuario, contrasenia):
    conexion, cursor = startConexion()

    consulta = f"UPDATE usuario SET nombre = '{nombre}', primer_apellido = '{primer_apellido}', segundo_apellido = '{segundo_apellido}', rol = '{rol}', usuario = '{usuario}', contrasenia = '{contrasenia}' WHERE id = {id}"


    cursor.execute(consulta)

    conexion.commit()

    cursor.close()
    conexion.close()

#-----------------GetAll Usuarios---------------
def getAllUsers():
    conexion, cursor = startConexion()

    status = 1
    consulta = f"SELECT * FROM usuario WHERE status = {status}"

    cursor.execute(consulta)

    # Recuperar todos los resultados
    results = cursor.fetchall()

    cursor.close()
    conexion.close()

    return results