from pydantic import BaseModel

class Libro(BaseModel):
    id: int = 0
    titulo: str = ""
    autor: str = ""
    genero: str = ""
    idioma: str = ""
    anio_publicacion: str = ""
    derechos_autor: int = 0
    pdf_base64: str = ""
    status: int = 0
