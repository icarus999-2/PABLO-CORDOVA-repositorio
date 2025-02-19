document.addEventListener("DOMContentLoaded", () => {
    const btnAgregar = document.getElementById("btnAgregarFormacion");
    const modal = document.getElementById("modal");
    const cerrarModal = document.getElementById("cerrarModal");
    const formRegistro = document.getElementById("formRegistro");
    const tbody = document.querySelector("#tablaRegistros tbody");
    let registros = [];

    function mostrarRegistros() {
        tbody.innerHTML = "";
        registros.forEach((registro, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${index + 1}</td>
                <td>${registro.formacion}</td>
                <td>${registro.pais}</td>
                <td>${registro.universidad}</td>
                <td>${registro.especialidad}</td>
                <td>${registro.fechaInicio}</td>
                <td>${registro.fechaFinal}</td>
                <td>${registro.grado}</td>
                <td>
                    <button onclick="editarRegistro(${index})">✏️</button>
                    <button onclick="eliminarRegistro(${index})">🗑️</button>
                </td>
            `;
            tbody.appendChild(fila);
        });
    }

    function guardarRegistro(event) {
        event.preventDefault();
        const registro = {
            formacion: document.getElementById("formacion").value,
            pais: document.getElementById("pais").value,
            universidad: document.getElementById("universidad").value,
            especialidad: document.getElementById("especialidad").value,
            fechaInicio: document.getElementById("fechaInicio").value,
            fechaFinal: document.getElementById("fechaFinal").value,
            grado: document.getElementById("grado").value
        };
        registros.push(registro);
        mostrarRegistros();
        modal.style.display = "none";
    }

    function editarRegistro(index) {
        const registro = registros[index];
        document.getElementById("formacion").value = registro.formacion;
        document.getElementById("pais").value = registro.pais;
        document.getElementById("universidad").value = registro.universidad;
        document.getElementById("especialidad").value = registro.especialidad;
        document.getElementById("fechaInicio").value = registro.fechaInicio;
        document.getElementById("fechaFinal").value = registro.fechaFinal;
        document.getElementById("grado").value = registro.grado;
        modal.style.display = "block";
    }

    function eliminarRegistro(index) {
        registros.splice(index, 1);
        mostrarRegistros();
    }

    btnAgregar.addEventListener("click", () => modal.style.display = "block");
    cerrarModal.addEventListener("click", () => modal.style.display = "none");
    formRegistro.addEventListener("submit", guardarRegistro);
});