function iniciarSesion() {
  let user = document.getElementById("txtUser").value;
  let password = document.getElementById("txtPassword").value;

  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  fetch("http://127.0.0.1:8080/login/" + user + "/" + password, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(JSON.parse(result))
      if (JSON.parse(result)["resultado"][0] === false) {
        Swal.fire("", "No hubo coincidencias", "error");
        return;
      } else {
        localStorage.setItem("tokenLibreria", JSON.parse(result)["resultado"][1]);
        window.location.href = "paginaInicio.html";
      }
    })
    .catch((error) => console.log("error", error));
}

//Borrar el token cuando se cierre sesión

function cerrarSesion(){
  localStorage.clear();
  window.location.href = "index.html";
}

// Verificar si el token existe en localStorage al cargar la página

function mostrarPassword() {
  let password = document.getElementById("txtPassword");
  let showPassword = document.getElementById("mostrarPassword");

  showPassword.addEventListener("change", function () {
    if (showPassword.checked) {
      // Si el checkbox está marcado, cambiar a tipo 'text'
      password.type = "text";
    } else {
      // Si el checkbox no está marcado, volver a tipo 'password'
      password.type = "password";
    }
  });
}

function comprobarCampos(){
  let user = document.getElementById("txtUser").value;
  let password = document.getElementById("txtPassword").value;

  if(user === "" || password === ""){
    Swal.fire('','Debes de llenar ambos campos','error');
    return;
  }else{
    iniciarSesion();
  }
}