// // Función para abrir el formulario al hacer clic en el enlace
// document.getElementById("openFormLink").addEventListener("click", function () {
//   var myModal = new bootstrap.Modal(document.getElementById("myModal"));
//   myModal.show();
// });

// // Función para abrir y ver los libros al hacer clic en el enlace
// document
//   .getElementById("openBiblioteca")
//   .addEventListener("click", function () {
//     var myModal = new bootstrap.Modal(document.getElementById("open-b"));
//     myModal.show();
//   });

// function saveBook() {
//   let titulo = document.getElementById("titulo").value;
//   let autor = document.getElementById("autor").value;
//   let categoria = document.getElementById("categoria").value;
//   let libro_pdf = "hola";

//   // Verificar si se seleccionó un archivo
//   if (libro_pdf.files.length === 0) {
//     alert("Por favor, seleccione un archivo PDF.");
//     return;
//   } else if (libro_pdf.files.length > 1) {
//     alert("Solo ingresa un archivo PDF");
//     return;
//   }


//   // Crear un objeto con los datos del libro
//   let data_book = {
//     titulo: titulo,
//     autor: autor,
//     categoria: categoria,
//   };

//   // Realizar la solicitud POST a la API para guardar el libro
//   fetch("http://127.0.0.1:8080/save_book", {
//     method: "POST",
//     body: data_book,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       alert("Libro guardado exitosamente.");
//     })
//     .catch((error) => {
//       console.error("Error al enviar la solicitud:", error);
//       alert("Hubo un error al guardar el libro.");
//     });
// }
