async function mostrarHorario() {
  try {
    const response = await fetch('http://127.0.0.1:5501/horarios-json.json');
    const data = await response.json();

    const tabla = document.getElementById('Horario_clase').querySelector('tbody');
    if (!tabla) {
      console.error('No se encontró la tabla con id "Horario_clase"');
      return;
    }
    tabla.innerHTML = ""; // Limpiar la tabla antes de actualizar

    const semestreSeleccionado = document.getElementById("semestreSeleccionado");
    if (!semestreSeleccionado) {
      console.error('No se encontró el elemento con id "semestreSeleccionado"');
      return;
    }
    const semestre = semestreSeleccionado.value;
    console.log("Semestre Seleccionado:", semestre); // Verifica que esté tomando el valor correcto

    const cursosFiltrados = data.cursos.filter(curso => curso.semestre.toString() === semestre);

    if (cursosFiltrados.length === 0) {
      console.log('No se encontraron cursos para el semestre seleccionado');
    }

    // Función auxiliar para obtener el índice de la fila basado en la hora
    function obtenerIndiceFila(hora) {
      const horas = hora.split('-').map(h => parseInt(h.trim()));
      if (horas.length < 2 || isNaN(horas[0])) return -1;

      // Ajusta la fórmula según las horas de la tabla. Si las filas están de 8-10, 10-12, 12-14...
      return (horas[0] - 8) / 2;
    }

    // Función para eliminar tildes y convertir a minúsculas
    function normalizarTexto(texto) {
      return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    // Obtener el índice de la columna basado en el día
    function obtenerIndiceColumna(dia) {
      const diasSemana = [' ', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
      dia = normalizarTexto(dia);
      return diasSemana.findIndex(d => normalizarTexto(d) === dia);
    }

    // Iterar sobre los cursos filtrados y agregar el contenido a la tabla
    cursosFiltrados.forEach(curso => {
      const filaIndex = obtenerIndiceFila(curso.hora);
      if (filaIndex === -1) {
        console.error(`Hora no válida para el curso: ${curso.nomCurso}`);
        return;
      }

      const fila = tabla.rows[filaIndex];
      if (!fila) {
        console.error(`No se encontró la fila con índice ${filaIndex}`);
        return;
      }

      const columnaIndex = obtenerIndiceColumna(curso.dia);
      if (columnaIndex === -1) {
        console.error(`Día no válido para el curso: ${curso.nomCurso}`);
        return;
      }

      const columna = fila.cells[columnaIndex];
      if (!columna) {
        console.error(`No se encontró la columna con índice ${columnaIndex}`);
        return;
      }

      // Crear un elemento div para mostrar el curso
      const divCurso = document.createElement('div');
      divCurso.textContent = `${curso.nomCurso} (${curso.docente})`;

      // Agregar evento para mostrar detalles al hacer clic
      divCurso.addEventListener('click', () => {
        alert(`Curso: ${curso.nomCurso}\nDocente: ${curso.docente}`);
      });

      // Añadir el div a la columna correspondiente
      columna.appendChild(divCurso);
    });
  } catch (error) {
    console.error('Error al cargar o procesar los datos:', error);
  }
}

// Llamar a la función cuando el usuario cambia el semestre
document.getElementById("semestreSeleccionado").addEventListener("change", mostrarHorario);

// Llamar a la función inicialmente para cargar los horarios al cargar la página
document.addEventListener("DOMContentLoaded", mostrarHorario);
