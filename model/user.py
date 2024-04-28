from pydantic import BaseModel


class Usuario(BaseModel):
    id: int
    nombre: str
    primer_apellido: str
    segundo_apellido: str
    rol: str
    usuario: str
    contrasenia: str