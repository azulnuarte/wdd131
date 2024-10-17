document.addEventListener('DOMContentLoaded', () => {
  const daysContainer = document.getElementById('daysContainer');
  const taskForm = document.getElementById('taskForm');
  const taskList = document.getElementById('taskList');
  const currentMonthYear = document.getElementById('currentMonthYear');
  const prevMonthBtn = document.getElementById('prevMonthBtn');
  const nextMonthBtn = document.getElementById('nextMonthBtn');
  const aiAssistBtn = document.getElementById('aiAssistBtn');
  const settingsBtn = document.getElementById('settingsBtn');
  const aiModal = document.getElementById('aiModal');
  const settingsModal = document.getElementById('settingsModal');
  const eventModal = document.getElementById('eventModal');
  const closeButtons = document.querySelectorAll('.close');
  const themeSelect = document.getElementById('themeSelect');
  const saveSettingsBtn = document.getElementById('saveSettings');
  const eventForm = document.getElementById('eventForm');
  const deleteEventBtn = document.getElementById('deleteEventBtn');
  const modalTitle = document.getElementById('modalTitle');

  let currentDate = new Date();
  let events = {};

  // Load events from localStorage
  if(localStorage.getItem('events')){
      events = JSON.parse(localStorage.getItem('events'));
  }

  // Load theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark-theme', savedTheme === 'dark');
  themeSelect.value = savedTheme;

  function renderCalendar() {
      daysContainer.innerHTML = '';
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      currentMonthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

      // Fill in blank days before the first day
      for(let i = 0; i < firstDay; i++) {
          const emptyDiv = document.createElement('div');
          daysContainer.appendChild(emptyDiv);
      }

      for(let day = 1; day <= daysInMonth; day++) {
          const dayDiv = document.createElement('div');
          dayDiv.classList.add('day');

          const dateSpan = document.createElement('span');
          dateSpan.classList.add('date');
          dateSpan.textContent = day;
          dayDiv.appendChild(dateSpan);

          const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          if(events[dateKey] && events[dateKey].length > 0){
              const indicator = document.createElement('div');
              indicator.classList.add('event-indicator');
              dayDiv.appendChild(indicator);
          }

          // Highlight today
          const today = new Date();
          if(day === today.getDate() && month === today.getMonth() && year === today.getFullYear()){
              dayDiv.classList.add('today');
          }

          // Click to open event modal
          dayDiv.addEventListener('click', () => {
              openEventModal(dateKey);
          });

          daysContainer.appendChild(dayDiv);
      }
  }

  function addEvent(eventData) {
      const { id, title, date, time, description, reminder } = eventData;
      if(!events[date]){
          events[date] = [];
      }
      events[date].push({ id, title, time, description, reminder });
      saveEvents();
      renderCalendar();
      displayEventsForDate(date);
  }

  function saveEvents(){
      localStorage.setItem('events', JSON.stringify(events));
  }

  function displayEventsForDate(date){
      taskList.innerHTML = '';
      if(events[date]){
          events[date].forEach((event, index) => {
              const taskItem = document.createElement('div');
              taskItem.classList.add('task-item');

              const taskInfo = document.createElement('div');
              taskInfo.classList.add('task-info');
              const taskName = document.createElement('span');
              taskName.textContent = event.title;
              const taskTime = document.createElement('span');
              taskTime.textContent = event.time ? event.time : 'All Day';
              taskInfo.appendChild(taskName);
              taskInfo.appendChild(taskTime);

              const actions = document.createElement('div');
              actions.classList.add('actions');
              const editBtn = document.createElement('button');
              editBtn.innerHTML = '<i class="fas fa-edit"></i>';
              editBtn.title = 'Edit Event';
              editBtn.addEventListener('click', () => {
                  openEventModal(date, event.id);
              });
              const deleteBtn = document.createElement('button');
              deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
              deleteBtn.title = 'Delete Event';
              deleteBtn.addEventListener('click', () => {
                  deleteEvent(date, event.id);
              });
              actions.appendChild(editBtn);
              actions.appendChild(deleteBtn);

              taskItem.appendChild(taskInfo);
              taskItem.appendChild(actions);

              taskList.appendChild(taskItem);
          });
      } else {
          taskList.innerHTML = '<p>No events for this day.</p>';
      }
  }

  function deleteEvent(date, eventId){
      events[date] = events[date].filter(event => event.id !== eventId);
      if(events[date].length === 0){
          delete events[date];
      }
      saveEvents();
      renderCalendar();
      displayEventsForDate(date);
  }

  function openEventModal(date, eventId = null){
      eventModal.style.display = 'block';
      if(eventId){
          const event = events[date].find(ev => ev.id === eventId);
          if(event){
              modalTitle.textContent = 'Edit Event';
              document.getElementById('eventId').value = event.id;
              document.getElementById('eventTitle').value = event.title;
              document.getElementById('eventDate').value = event.date;
              document.getElementById('eventTime').value = event.time;
              document.getElementById('eventDescription').value = event.description;
              document.getElementById('eventReminder').checked = event.reminder;
              deleteEventBtn.style.display = 'inline-block';
          }
      } else {
          modalTitle.textContent = 'Add Event';
          eventForm.reset();
          document.getElementById('eventId').value = '';
          deleteEventBtn.style.display = 'none';
          document.getElementById('eventDate').value = date;
      }
  }

  function closeModal(){
      aiModal.style.display = 'none';
      settingsModal.style.display = 'none';
      eventModal.style.display = 'none';
  }

  // Handle Event Form Submission
  eventForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('eventId').value || Date.now().toString();
      const title = document.getElementById('eventTitle').value.trim();
      const date = document.getElementById('eventDate').value;
      const time = document.getElementById('eventTime').value;
      const description = document.getElementById('eventDescription').value.trim();
      const reminder = document.getElementById('eventReminder').checked;

      if(title && date){
          const eventData = { id, title, date, time, description, reminder };
          if(document.getElementById('eventId').value){
              // Edit existing event
              events[date] = events[date].map(ev => ev.id === id ? eventData : ev);
          } else {
              // Add new event
              addEvent(eventData);
          }
          saveEvents();
          renderCalendar();
          displayEventsForDate(date);
          closeModal();
      }
  });

  // Handle Delete Event
  deleteEventBtn.addEventListener('click', () => {
      const id = document.getElementById('eventId').value;
      const date = document.getElementById('eventDate').value;
      if(id && date){
          deleteEvent(date, id);
          closeModal();
      }
  });

  // Handle Task Form Submission (Add Task)
  taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskTitle = document.getElementById('taskInput').value.trim();
      const taskDate = document.getElementById('taskDate').value;
      const taskTime = document.getElementById('taskTime').value;
      const taskDescription = document.getElementById('taskDescription').value.trim();

      if(taskTitle && taskDate){
          const eventData = {
              id: Date.now().toString(),
              title: taskTitle,
              date: taskDate,
              time: taskTime,
              description: taskDescription,
              reminder: false
          };
          addEvent(eventData);
          taskForm.reset();
      }
  });

  prevMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
  });

  nextMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
  });

  // AI Assistance Modal
  aiAssistBtn.addEventListener('click', () => {
      aiModal.style.display = 'block';
  });

  // Settings Modal
  settingsBtn.addEventListener('click', () => {
      settingsModal.style.display = 'block';
  });

  // Close Modals
  closeButtons.forEach(btn => {
      btn.addEventListener('click', closeModal);
  });

  window.addEventListener('click', (e) => {
      if(e.target == aiModal){
          aiModal.style.display = 'none';
      }
      if(e.target == settingsModal){
          settingsModal.style.display = 'none';
      }
      if(e.target == eventModal){
          eventModal.style.display = 'none';
      }
  });

  // Save Settings
  saveSettingsBtn.addEventListener('click', () => {
      const selectedTheme = themeSelect.value;
      document.body.classList.toggle('dark-theme', selectedTheme === 'dark');
      localStorage.setItem('theme', selectedTheme);
      settingsModal.style.display = 'none';
  });

  // Initial Render
  renderCalendar();

  // Display today's events on load
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() +1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  displayEventsForDate(todayKey);
});
