from pydantic import BaseModel

class University(BaseModel):
    id: int = 0
    dominio: str = ""
    getall: str = ""
    nombre: str = ""
