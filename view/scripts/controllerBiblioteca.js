books = [];

function inicializar() {
    loaded();
    getAllBooks();
    cardsFilter(
        document.getElementById("txtBuscar"),
        document.getElementById("searchButton"),
        document.getElementById("bookCards"),
        books
    );
}

window.onload = inicializar;

function cardsFilter(txtBuscar, btnBuscar, bookCards, books) {
    btnBuscar.addEventListener("click", function () {
        // Obtener el valor actual del campo de búsqueda en minúsculas
        const searchText = txtBuscar.value;

        // Filtrar los libros en función del texto de búsqueda
        const filteredBooks = books.filter((book) => {
            return (
                book.titulo.includes(searchText) ||
                book.autor.includes(searchText) ||
                book.idioma.includes(searchText) ||
                book.genero.includes(searchText) ||
                book.anio_publicacion.toString().includes(searchText)
            );
        });

        // Limpiar el contenedor de tarjetas
        bookCards.innerHTML = "";

        // Agregar las tarjetas de los libros filtrados al contenedor
        filteredBooks.forEach((book) => {
            addBookCard(book);
        });
    });
}

// Obtener la referencia al campo de búsqueda y al contenedor de tarjetas de libros
const txtBuscar = document.getElementById("txtBuscar");
const bookCards = document.getElementById("bookCards");

// Agregar un oyente de eventos para la entrada de texto
txtBuscar.addEventListener("input", function () {
    // Obtener el valor actual del campo de búsqueda
    const searchText = txtBuscar.value;

    // Filtrar los libros en función del texto de búsqueda
    const filteredBooks = books.filter((book) => {
        return (
            book.titulo.includes(searchText) ||
            book.autor.includes(searchText) ||
            book.idioma.includes(searchText) ||
            book.genero.includes(searchText) ||
            book.anio_publicacion.toString().includes(searchText)
        );
    });

    // Limpiar el contenedor de tarjetas
    bookCards.innerHTML = "";

    // Agregar las tarjetas de los libros filtrados al contenedor
    filteredBooks.forEach((book) => {
        addBookCard(book);
    });
});

// Función para agregar una tarjeta de libro al contenedor
function addBookCard(book) {
    const bookCards = document.getElementById("bookCards");

    // Crea un elemento div para la tarjeta de libro
    const card = document.createElement("div");
    card.classList.add("col-md-4"); // Estilo de Bootstrap para columnas

    // Agrega contenido a la tarjeta (título, autor, etc.)
    card.innerHTML = `
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title text-center">${book.titulo}</h5>
                <p class="card-text"><strong>Autor:</strong> ${book.autor}</p>
                <p class="card-text"><strong>Idioma:</strong> ${book.idioma}</p>
                <p class="card-text"><strong>Año de publicación:</strong> ${book.anio_publicacion}</p>
                <p class="card-text"><strong>Género:</strong> ${book.genero}</p>
                <div class="text-center">
                    <button class="btn btn-primary mt-2 mb-3" id="verLibroButton">Ver libro</button>
                </div>
            </div>
        </div>
    `;

    // Agrega la tarjeta al contenedor
    bookCards.appendChild(card);

    // Agrega un manejador de eventos para abrir el PDF en una nueva ventana al hacer clic en el botón
    const verLibroButton = card.querySelector("#verLibroButton");
    verLibroButton.addEventListener("click", function () {
        const pdfWindow = window.open();
        pdfWindow.document.open();
        pdfWindow.document.write(`
            <embed src="data:application/pdf;base64,${book.pdf_base64}" type="application/pdf" width="100%" height="100%">
        `);
        pdfWindow.document.close();
    });
}



function getAllBooks(){
    let url = ""
    let token = localStorage.getItem("tokenLibreria");
    let decodedToken  = decodeToken(token);
  if (decodedToken && decodedToken.role) {
      if ( decodedToken.role === 'Administrador') {
        url = "http://127.0.0.1:8080/libros/getall"
      } else if (decodedToken.role === 'Alumno') {
        url = "http://127.0.0.1:8080/libros/platforms/getall"
        
      } else {
        // Ocultar otros elementos de la clase .usuario
        element.style.display = 'none';
      }
  }
    fetch(url)
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      if (data.exception != null) {
        swal.fire(
          "",
          "Error interno del servidor. Intente nuevamente más tarde.",
          "Error"
        );
        window.location.replace("index.html");
        return;
      }
      if (data.error != null) {
        Swal.fire("", data.error, "warning");
        return;
      }
      if (data.errorsec != null) {
        Swal.fire("", data.errorsec, "error");
        window.location.replace("index.html");
        return;
      }
      books = data
      data.forEach((book) => {
        addBookCard(book);
      })
    });
}