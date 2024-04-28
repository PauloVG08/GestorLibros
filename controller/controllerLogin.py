from controller.bd.conexion import startConexion
from controller.token import generateToken
def login(user, password):
    conexion, cursor = startConexion()

    usuario_input = user
    contrasenia_input = password
    consulta = "SELECT rol FROM usuario WHERE usuario = %s AND contrasenia = %s AND status = 1"

    cursor.execute(consulta, (usuario_input, contrasenia_input))
    
    resultado = cursor.fetchone()
    cursor.close()
    conexion.close()
    try:
        if len(resultado) > 0:
            rol = resultado[0]
            resultado = True
            token = generateToken(usuario_input, rol)
        return [resultado, token]
    except:
        return [False]

