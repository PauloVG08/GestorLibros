import uvicorn
from api.booksApi import app
from api.userApi import app
from api.booksApi import app

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
