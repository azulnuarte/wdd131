// Variables para calendario y tareas
const daysContainer = document.getElementById('daysContainer');
const currentMonthYear = document.getElementById('currentMonthYear');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const taskTime = document.getElementById('taskTime');
const taskDescription = document.getElementById('taskDescription');
const taskList = document.getElementById('taskList');

let currentDate = new Date();
let events = JSON.parse(localStorage.getItem('calendarEvents')) || {};
let tasks = JSON.parse(localStorage.getItem('taskList')) || [];

// Renderizar calendario y eventos guardados
function renderCalendar() {
    daysContainer.innerHTML = '';
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    currentMonthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    // Días vacíos antes del primer día del mes
    for (let i = 0; i < firstDayOfMonth; i++) {
        daysContainer.appendChild(document.createElement('div'));
    }

    // Días del mes
    for (let day = 1; day <= totalDaysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;
        dayDiv.className = 'day';

        // Mostrar eventos guardados
        const dateKey = `${year}-${month}-${day}`;
        if (events[dateKey]) {
            events[dateKey].forEach(eventTitle => {
                const eventItem = document.createElement('div');
                eventItem.textContent = eventTitle;
                eventItem.className = 'event';
                dayDiv.appendChild(eventItem);
            });
        }

        // Añadir nuevo evento
        dayDiv.addEventListener('click', () => {
            const eventTitle = prompt("Título del evento:");
            if (eventTitle) {
                if (!events[dateKey]) events[dateKey] = [];
                events[dateKey].push(eventTitle);
                localStorage.setItem('calendarEvents', JSON.stringify(events));
                renderCalendar(); // Recargar calendario para mostrar el evento
            }
        });

        daysContainer.appendChild(dayDiv);
    }
}

// Navegación de mes
prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});
nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Guardar y cargar tareas con checkbox para completarlas
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                tasks.splice(index, 1); // Eliminar la tarea del array
                localStorage.setItem('taskList', JSON.stringify(tasks)); // Guardar el cambio en localStorage
                renderTasks(); // Actualizar la lista de tareas en pantalla
            }
        });

        const taskText = document.createElement('span');
        taskText.textContent = `${task.title} - ${task.date} ${task.time} - ${task.description}`;

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskList.appendChild(taskItem);
    });
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTask = {
        title: taskInput.value,
        date: taskDate.value,
        time: taskTime.value,
        description: taskDescription.value
    };
    tasks.push(newTask);
    localStorage.setItem('taskList', JSON.stringify(tasks));
    renderTasks();
    taskForm.reset();
});

// Pomodoro Timer
let isTimerRunning = false;
let pomodoroInterval;
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
let timerMinutes = 25;
let timerSeconds = 0;

function updatePomodoroDisplay() {
    timeDisplay.textContent = `${String(timerMinutes).padStart(2, '0')}:${String(timerSeconds).padStart(2, '0')}`;
}

function startPomodoro() {
    if (isTimerRunning) return;
    isTimerRunning = true;
    pomodoroInterval = setInterval(() => {
        if (timerSeconds === 0) {
            if (timerMinutes === 0) {
                clearInterval(pomodoroInterval);
                isTimerRunning = false;
                alert('Pomodoro terminado!');
                timerMinutes = 25;
                timerSeconds = 0;
            } else {
                timerMinutes--;
                timerSeconds = 59;
            }
        } else {
            timerSeconds--;
        }
        updatePomodoroDisplay();
    }, 1000);
}

function resetPomodoro() {
    clearInterval(pomodoroInterval);
    isTimerRunning = false;
    timerMinutes = 25;
    timerSeconds = 0;
    updatePomodoroDisplay();
}

startBtn.addEventListener('click', startPomodoro);
resetBtn.addEventListener('click', resetPomodoro);

// Inicializar
renderCalendar();
renderTasks();
updatePomodoroDisplay();


