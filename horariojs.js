async function mostrarHorario() {
    const response = await fetch('http://127.0.0.1:5500/datos.json');
    const data = await response.json();
  
    const tabla = document.getElementById('Horario_clase').querySelector('tbody');
  
    // Función auxiliar para obtener el índice de la fila basado en la hora
    function obtenerIndiceFila(hora) {
      
      const horas = hora.split('-');
      const horaInicio = parseInt(horas[0]);
      // Suponiendo que cada fila representa una hora, ajusta el cálculo si es diferente
      return horaInicio - 7; // Asumiendo que la primera fila corresponde a las 7:00
    }
  
    // Función para eliminar tildes y convertir a minúsculas
    function normalizarTexto(texto) {
      return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    // Obtener el índice de la columna basado en el día
    function obtenerIndiceColumna(dia) {
    const diasSemana = [' ', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    dia = normalizarTexto(dia); // Normalizamos el día de entrada

    return diasSemana.findIndex(d => normalizarTexto(d) === dia);
}
  
    data.cursos.forEach(curso => {
      const fila = tabla.rows[obtenerIndiceFila(curso.hora)];
      const columna = fila.cells[obtenerIndiceColumna(curso.dia)];
  
      // Crear un elemento div para contener la información del curso
      const divCurso = document.createElement('div');
      divCurso.textContent = `${curso.nomCurso} (${curso.docente})`;
      // Agregar un evento al div para mostrar más detalles al hacer clic 
      divCurso.addEventListener('click', () => {
        // Aquí se puede mostrar un modal o una alerta con más información del curso
        alert(`Curso: ${curso.nomCurso}\nDocente: ${curso.docente}`);
      });
  
      columna.appendChild(divCurso);
    });
  }
  
  mostrarHorario();