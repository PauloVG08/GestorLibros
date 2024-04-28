from fastapi import FastAPI
from controller.controllerLogin import login
from controller.token import validateToken
from controller.controllerUsuario import guardarUsuario
from controller.controllerUsuario import eliminarUsuario
from controller.controllerUsuario import actualizarUsuario
from fastapi.middleware.cors import CORSMiddleware
from model.user import Usuario
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:5501"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/login/{user}/{password}", tags=["Users"])
def checkUser(user: str, password: str):
    result = login(user, password)
    return {"resultado": result }

@app.post("/token", tags=["Users"])
def valiToken(token:str):
    result = validateToken(token)
    return {"resultado": result}
