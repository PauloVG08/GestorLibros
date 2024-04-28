function loaded() {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };
    try {
      token = localStorage.getItem("tokenLibreria");
      if (token == " ") {
        Swal.fire("", "No tienes acceso", "error");
        window.location.href = "index.html";
      }
    } catch (error) {
      Swal.fire("", "No tienes acceso", "error");
      window.location.href = "index.html";
    }
    fetch("http://127.0.0.1:8080/token?token=" + token, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (JSON.parse(result)["resultado"] === false) {
          Swal.fire("", "No tienes acceso", "error");
          window.location.href = "../../index.html";
          return;
        } else {
          token = localStorage.getItem("tokenLibreria");
          accesControl(token)
        }
      })
      .catch((error) => console.log("error", error));
  }

function accesControl(token){
  let decodedToken  = decodeToken(token);
  if (decodedToken && decodedToken.role) {
    const usuarioElements = document.querySelectorAll('.usuario');

    usuarioElements.forEach(element => {
      if (element.classList.contains('admin-content') && decodedToken.role === 'Administrador') {
        // Mostrar contenido para administradores
        element.style.display = 'block';
      } else if (element.classList.contains('alumno-content') && decodedToken.role === 'Alumno') {
        // Mostrar contenido para alumnos
        element.style.display = 'block';
      } else {
        // Ocultar otros elementos de la clase .usuario
        element.style.display = 'none';
      }
    });
  }
}

function decodeToken(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}