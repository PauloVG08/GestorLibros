from fastapi import FastAPI
from controller.controllerUsuario import guardarUsuario
from controller.controllerUsuario import eliminarUsuario
from controller.controllerUsuario import actualizarUsuario
from controller.controllerUsuario import getAllUsers
from fastapi.middleware.cors import CORSMiddleware
from model.user import Usuario

from api.booksApi import app


@app.post("/addUser")
def addUser(user: Usuario):
    if user.id == 0:
        result = guardarUsuario(user.nombre,user.primer_apellido,user.segundo_apellido,
                            user.rol,user.usuario,user.contrasenia)
    else: 
        result = actualizarUsuario(user.id, user.nombre,user.primer_apellido,user.segundo_apellido,
                            user.rol,user.usuario,user.contrasenia)
    return {"resultado": result}


@app.post("/deleteUser/{id}")
def deleteUser(id: int):
    result = eliminarUsuario(id)
    return {"resultado":result}

@app.post("/updateUser")
def updateUser(user: Usuario):
    result = actualizarUsuario(user.id, user.nombre,user.primer_apellido,user.segundo_apellido,
                            user.rol,user.usuario,user.contrasenia)
    return {"resultado": result}

@app.get("/getAllUsers")
def getAll():
    result = getAllUsers()
    return result