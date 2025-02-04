async function fetchData() {
    try {
        const response = await fetch('http://127.0.0.1:5501/asistenciajson.json');
        const data = await response.json();
        const datosDocente = data.docente; 

        // Seleccionar todas las filas del tbody que ya están en la tabla
        const filas = document.querySelectorAll('.report-table tbody tr');

        // Recorre los datos y rellena las celdas de cada fila
        datosDocente.forEach((item, index) => {
            // verificar si hay una fila para este índice
            if (filas[index]) {
                const celdas = filas[index].children; // Selecciona las celdas de la fila

                // rellenar cada celda con los datos correspondientes
                celdas[0].textContent = obtenerDiaSemana(item.fecha);
                celdas[1].textContent = `${item.codCurso}-${item.secCurso} (${item.teopra})`; // curso
                celdas[2].textContent = item.hora; // horario
                celdas[3].textContent = `${item.horEntrada} - ${item.horSalida}`; // marcación

                if (item.estado === 1) {
                    celdas[4].textContent = 'P';
                    celdas[4].classList.remove('bg-danger'); // remueve clase de fondo rojo si existiera
                    celdas[4].classList.add('bg-success', 'text-white'); 
                } else if (item.estado === 2) {
                    celdas[4].textContent = 'F'; // Falta
                    celdas[4].classList.remove('bg-success'); 
                    celdas[4].classList.add('bg-danger', 'text-white'); // Clase de fondo rojo
                }
            }
        });
    } catch (error) {
        alert('Ocurrió un error al cargar los datos');
        console.log(error);
    } finally {
        console.log('Fin de la solicitud');
    }
}

// Función para convertir la fecha en un día de la semana
function obtenerDiaSemana(fechaStr) {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const fecha = new Date(fechaStr);
    return dias[fecha.getDay()];
}

fetchData();