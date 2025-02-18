async function mostrarHorario() {
    try {
      const response = await fetch('http://127.0.0.1:5500/horarios-json.json');
      const data = await response.json();
  
      const tabla = document.getElementById('Horario_clase').querySelector('tbody');
      if (!tabla) {
        console.error('No se encontró la tabla con id "Horario_clase"');
        return;
      }
  
      // Función auxiliar para obtener el índice de la fila basado en la hora
      function obtenerIndiceFila(hora) {
        const horas = hora.split('-').map(h => parseInt(h.trim()));

        return (horas[0] - 7) ;
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
  
      // Ordenar los cursos por hora (por ejemplo, si tienes una propiedad 'hora' para ordenar)
      const cursosOrdenados = data.cursos.sort((a, b) => {
        const horaA = a.hora.split('-')[0];
        const horaB = b.hora.split('-')[0];
        return parseInt(horaA) - parseInt(horaB);
      });
  
      // Iterar sobre los cursos ordenados y agregar el contenido a la tabla
      cursosOrdenados.forEach(curso => {
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
  document.addEventListener("DOMContentLoaded", mostrarHorario);