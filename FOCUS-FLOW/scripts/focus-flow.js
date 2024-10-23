const daysContainer = document.getElementById('daysContainer');
const currentMonthYear = document.getElementById('currentMonthYear');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');

let currentDate = new Date();

function renderCalendar() {
    // Vaciar el contenedor de días
    daysContainer.innerHTML = '';
    
    // Obtener el mes y el año actuales
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    
    // Establecer el mes y el año en el encabezado
    currentMonthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    // Calcular el primer día del mes y el número total de días
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    // Llenar los días en el calendario
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDay = document.createElement('div');
        daysContainer.appendChild(emptyDay);
    }

    for (let day = 1; day <= totalDaysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;
        dayDiv.className = 'day';

        // Añadir un evento al día
        dayDiv.addEventListener('click', () => {
            const eventTitle = prompt("Título del evento:");
            if (eventTitle) {
                const eventItem = document.createElement('div');
                eventItem.textContent = eventTitle;
                eventItem.className = 'event';

                // Al hacer clic en el evento, mostrar detalles
                eventItem.addEventListener('click', () => {
                    alert(`Evento: ${eventTitle}\nFecha: ${day}/${month + 1}/${year}`);
                });

                dayDiv.appendChild(eventItem);
            }
        });

        daysContainer.appendChild(dayDiv);
    }
}

// Navegar al mes anterior
prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

// Navegar al siguiente mes
nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Inicializa el calendario
renderCalendar();
