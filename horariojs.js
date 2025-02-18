document.addEventListener("DOMContentLoaded", () => {
  cargarSemestres(); // Llenar el select con los semestres disponibles
  document.getElementById("semestreSelect").addEventListener("change", mostrarHorario);
  mostrarHorario(); // Cargar el horario al inicio con el primer semestre
});

async function cargarSemestres() {
  try {
    const response = await fetch("http://127.0.0.1:5500/horarios-json.json");
    const data = await response.json();
    
    const semestresUnicos = [...new Set(data.cursos.map(curso => curso.semestre))].sort();
    const select = document.getElementById("semestreSelect");
    
    select.innerHTML = semestresUnicos.map(sem => `<option value="${sem}">${sem}</option>`).join("");
  } catch (error) {
    console.error("Error al cargar semestres:", error);
  }
}

async function mostrarHorario() {
  try {
    const response = await fetch("http://127.0.0.1:5500/horarios-json.json");
    const data = await response.json();
    const semestreSeleccionado = parseInt(document.getElementById("semestreSelect").value);

    const tabla = document.getElementById("Horario_clase").querySelector("tbody");
    if (!tabla) {
      console.error("No se encontró la tabla con id 'Horario_clase'");
      return;
    }
    
    tabla.querySelectorAll("td div").forEach(div => div.remove());
    
    function obtenerIndiceFila(hora) {
      return parseInt(hora.split("-")[0].trim()) - 7;
    }
    
    function normalizarTexto(texto) {
      return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    }

    function obtenerIndiceColumna(dia) {
      const diasSemana = ["hora", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
      return diasSemana.findIndex(d => normalizarTexto(d) === normalizarTexto(dia));
    }

    const cursosFiltrados = data.cursos.filter(curso => curso.semestre === semestreSeleccionado);
    const cursosOrdenados = cursosFiltrados.sort((a, b) => parseInt(a.hora.split("-")[0]) - parseInt(b.hora.split("-")[0]));

    cursosOrdenados.forEach(curso => {
      const filaIndex = obtenerIndiceFila(curso.hora);
      const columnaIndex = obtenerIndiceColumna(curso.dia);
      if (filaIndex === -1 || columnaIndex === -1) return;
      
      const fila = tabla.rows[filaIndex];
      if (!fila) return;
      
      const columna = fila.cells[columnaIndex];
      if (!columna) return;
      
      const divCurso = document.createElement("div");
      divCurso.textContent = `${curso.nomCurso} (${curso.docente})`;
      divCurso.addEventListener("click", () => {
        alert(`Curso: ${curso.nomCurso}\nDocente: ${curso.docente}`);
      });
      columna.appendChild(divCurso);
    });
  } catch (error) {
    console.error("Error al cargar o procesar los datos:", error);
  }
}
