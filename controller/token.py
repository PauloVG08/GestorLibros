import jwt
import datetime

def generateToken(user, rol):

    payload = {
        "usuario": user,
        "role": rol,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }

    clave_secreta = "libreria"  

    token = jwt.encode(payload, clave_secreta, algorithm='HS256')

    return token

def validateToken(token):
    try:
        # Verifica y decodifica el token
        payload = jwt.decode(token, "libreria", algorithms=['HS256'])
        return True
    except jwt.ExpiredSignatureError:
        return False
    except jwt.DecodeError:
        return False
