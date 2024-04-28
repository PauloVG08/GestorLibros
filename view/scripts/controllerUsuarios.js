let users = [];

function inicializar() {
  loaded();
  actualizarTabla();
  filterTable(document.getElementById("searchTable"));
}

window.onload = inicializar;

function filterTable(txtBuscar) {
  txtBuscar.addEventListener("input", function () {
    const searchText = txtBuscar.value.toLowerCase();
    const tableRows = document.querySelectorAll("#userTableBody tr");

    tableRows.forEach((row) => {
      const rowData = row.textContent.toLowerCase();
      if (rowData.includes(searchText)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });
}

function saveUser() {
  const nombre = document.getElementById("nombre").value;
  const primer_apellido = document.getElementById("primer_apellido").value;
  const segundo_apellido = document.getElementById("segundo_apellido").value;
  const rol = document.getElementById("rol").value;
  const usuario = document.getElementById("usuario").value;
  const contrasenia = document.getElementById("contrasenia").value;
  let id = document.getElementById("id_user").value;

  if (id === "") {
    id = 0;
  }

  const userData = {
    id,
    nombre,
    primer_apellido,
    segundo_apellido,
    rol,
    usuario,
    contrasenia,
  };

  fetch("http://127.0.0.1:8080/addUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
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
      }
      limpiarFormulario();
      Swal.fire("", "Usuario guardado", "success");
      inicializar();
    });
}

document.getElementById("send").addEventListener("click", function () {
  saveUser();
  limpiarFormulario()
});

function actualizarTabla() {
  fetch("http://127.0.0.1:8080/getAllUsers")
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
      users = data;
      loadTable(data);
    });
}

function loadTable(data) {
  let cuerpo = "";

  data.forEach((userArray) => {
    let registro =
      "<tr>" +
      "<td>" +
      userArray[1] +
      "</td>" +
      "<td>" +
      userArray[2] +
      "</td>" +
      "<td>" +
      userArray[3] +
      "</td>" +
      "<td>" +
      userArray[4] +
      "</td>" +
      "<td>" +
      userArray[5] +
      "</td>" +
      "<td>" +
      '<button type="button" class="btn btn-warning text-white mt-2 v-user" view-user=\'' +
      JSON.stringify(userArray) +
      "'>Detalle</button>" +
      "</td>" +
      "</tr>";
    cuerpo += registro;
  });

  document.getElementById("userTableBody").innerHTML = cuerpo;

  const detailButtons = document.querySelectorAll(".v-user");
  detailButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const userData = JSON.parse(button.getAttribute("view-user"));
      verDetalle(userData);
    });
  });
}

function verDetalle(user) {
  document.getElementById("id_user").value = user[0];
  document.getElementById("nombre").value = user[1];
  document.getElementById("primer_apellido").value = user[2];
  document.getElementById("segundo_apellido").value = user[3];
  const rolSelect = document.getElementById("rol");
  const selectedRol = user[4];

  for (let i = 0; i < rolSelect.options.length; i++) {
    if (rolSelect.options[i].value === selectedRol) {
      rolSelect.selectedIndex = i;
      break;
    }
  }
  document.getElementById("usuario").value = user[5];
  document.getElementById("contrasenia").value = user[6];

  document.getElementById("btn_delete").disabled = false;
}

function deleteUser() {
  let id_user = document.getElementById("id_user").value;

  fetch("http://127.0.0.1:8080/deleteUser/" + id_user, {
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
        Swal.fire("","No tiene permiso para realizar esta operación","warning");
        return;
      }
      Swal.fire("", "Usuario eliminado", "success");
      inicializar();
    });
}

document.getElementById("btn_delete").addEventListener("click", function () {
  deleteUser();
  limpiarFormulario();
});

function limpiarFormulario(){
  document.getElementById("id_user").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("primer_apellido").value = "";
  document.getElementById("segundo_apellido").value = "";
  document.getElementById("rol").value = "";
  document.getElementById("usuario").value = "";
  document.getElementById("contrasenia").value = "";
  document.getElementById("btn-delete").disabled = true;
}
