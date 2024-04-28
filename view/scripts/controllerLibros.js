let books = [];
const nombre_universidad = "-Harvard"

function inicializar() {
  loaded();
  actualizarTabla();
  filterTable(document.getElementById("searchTable"));
}

window.onload = inicializar;

function filterTable(txtBuscar) {
  txtBuscar.addEventListener("input", function () {
    const searchText = txtBuscar.value;
    const tableRows = document.querySelectorAll("#bookTableBody tr");

    tableRows.forEach((row) => {
      const rowData = row.textContent;
      if (rowData.includes(searchText)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });
}
let pdf_base64 = "";

async  function saveBook() {
  let id = document.getElementById("id_libro").value;
  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const genero = document.getElementById("genero").value;
  const idioma = document.getElementById("idioma").value;
  const derechos_autor = parseInt(document.getElementById("derechos").value);
  const anio_publicacion = document.getElementById("anio").value;

  if (id === "") {
    id = 0;
  }

  let bookData = {
    id,
    titulo,
    autor,
    genero,
    idioma,
    anio_publicacion,
    derechos_autor,
    pdf_base64,
  };
  
  fetch("http://127.0.0.1:8080/libros/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.exception != null) {
        Swal.fire(
          "",
          "Error interno del servidor. Intente nuevamente mas tarde.",
          "error"
        );
        return;
      }

      if (data.error != null) {
        Swal.fire("", data.error, "warning");
        return;
      }

      if (data.errorperm != null) {
        Swal.fire(
          "",
          "No tiene permiso para realizar esta operacion",
          "warning"
        );
        return;
      }else{
        Swal.fire("", "Libro guardado", "success");
        limpiarFormulario();
        inicializar();
      }
      
     
    });
}

function b64() {
  const input = document.getElementById("archivoPDF");

  const file = input.files[0];

  const reader = new FileReader();

  reader.onload = function (event) {
    pdf_base64 = event.target.result.split(",")[1];
  };

  reader.readAsDataURL(file);
}


function actualizarTabla() {
  fetch("http://127.0.0.1:8080/libros/getall")
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
      books = data;
      loadTable(data);
    });
}

function loadTable(data) {
  let cuerpo = "";

  data.forEach((book) => {
    let registro =
      "<tr>" +
      "<td>" +
      book.titulo +
      "</td>" +
      "<td>" +
      book.autor +
      "</td>" +
      "<td>" +
      book.genero +
      "</td>" +
      "<td>" +
      book.idioma +
      "</td>" +
      "<td>" +
      book.anio_publicacion +
      "</td>" +
      "<td>" +
      '<button type="button" class="btn btn-warning text-white mt-2 v-book" view-book=\'' +
      JSON.stringify(book) +
      "'>Detalle</button>" +
      "</td>" +
      "</tr>";
    cuerpo += registro;
  });

  document.getElementById("bookTableBody").innerHTML = cuerpo;

  const detailButtons = document.querySelectorAll(".v-book");
  detailButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const bookData = JSON.parse(button.getAttribute("view-book"));
      verDetalle(bookData);
    });
  });
}

function verDetalle(book) {
  document.getElementById("id_libro").value = book.id;
  document.getElementById("titulo").value = book.titulo;
  document.getElementById("autor").value = book.autor;
  const generoSelect = document.getElementById("genero");
  const idiomaSelect = document.getElementById("idioma");
  document.getElementById("derechos").value = book.derechos_autor;
  document.getElementById("anio").value = book.anio_publicacion;

  const selectedGenero = book.genero;

  for (let i = 0; i < generoSelect.options.length; i++) {
    if (generoSelect.options[i].value === selectedGenero) {
      generoSelect.selectedIndex = i;
      break;
    }
  }

  const selectedIdioma = book.idioma;

  for (let i = 0; i < idiomaSelect.options.length; i++) {
    if (idiomaSelect.options[i].value === selectedIdioma) {
      idiomaSelect.selectedIndex = i;
      break;
    }
  }

  document.getElementById("btn_delete").disabled = false;
}

// function base64toBlob(base64, book) {
//   const archivoPDFInput = document.getElementById("archivoPDF");

//   if (base64) {
//     const byteCharacters = atob(base64);
//     const byteNumbers = new Array(byteCharacters.length);
//     for (let i = 0; i < byteCharacters.length; i++) {
//       byteNumbers[i] = byteCharacters.charCodeAt(i);
//     }
//     const byteArray = new Uint8Array(byteNumbers);
//     const blob = new Blob([byteArray]);

//     // Crear un nuevo elemento de entrada de tipo archivo
//     const newArchivoPDFInput = document.createElement("input");
//     newArchivoPDFInput.type = "file";
//     newArchivoPDFInput.style.display = "none";

//     // Crear un objeto File y asignarlo al nuevo elemento de entrada de archivo
//     const newFile = new File([blob], `${book.titulo}.pdf`);
//     newArchivoPDFInput.files = [newFile];

//     // Reemplazar el elemento original con el nuevo
//     archivoPDFInput.parentNode.replaceChild(
//       newArchivoPDFInput,
//       archivoPDFInput
//     );
//   } else {
//     // Limpiar el campo si no hay archivo PDF
//     archivoPDFInput.value = "";
//   }
// }

function limpiarFormulario() {
  document.getElementById("id_libro").value = "";
  document.getElementById("titulo").value = "";
  document.getElementById("autor").value = "";
  document.getElementById("genero").value = "";
  document.getElementById("idioma").value = "";
  document.getElementById("derechos").value = "";
  document.getElementById("anio").value = "";
  document.getElementById("archivoPDF").files[0] = "";
}

function deleteBook() {
  let id = document.getElementById("id_libro").value;

  fetch("http://127.0.0.1:8080/libros/delete/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.exception != null) {
        Swal.fire(
          "",
          "Error interno del servidor. Intente nuevamente más tarde.",
          "error"
        );
        return;
      }

      if (data.error != null) {
        Swal.fire("", data.error, "warning");
        return;
      }

      if (data.errorperm != null) {
        Swal.fire(
          "",
          "No tiene permiso para realizar esta operación",
          "warning"
        );
        return;
      }
      Swal.fire("", "Libro eliminado", "success");
      inicializar();
      document.getElementById("btn_delete").disabled = true;
      limpiarFormulario();
    });
}

document.getElementById("btn_delete").addEventListener("click", function () {
  deleteBook();
  limpiarFormulario();
});
