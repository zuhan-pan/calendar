//global variables
let nav = 0;
let clicked = null;
let events = localStorage.getItem('events')
  ? JSON.parse(localStorage.getItem('events'))
  : [];
const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

//query Selectors
const calendar = document.querySelector('#calendar');
const nextButton = document.querySelector('#nextButton');
const backButton = document.querySelector('#backButton');
const displayMonth = document.querySelector('#monthsDisplay');
const newEventModal = document.querySelector('#newEventModal');
const backDrop = document.querySelector('#modalBackDrop');
const deleteEventModal = document.querySelector('#deleteEventModal');
const saveButton = document.querySelector('#saveButton');
const cancelButton = document.querySelector('#cancelButton');
const eventTitleInput = document.querySelector('#eventTitleInput');

const deleteButton = document.querySelector('#deleteButton');
const closelButton = document.querySelector('#closelButton');

//eventListeners
window.addEventListener('load', load);
nextButton.addEventListener('click', () => {
  nav++;
  load();
});
backButton.addEventListener('click', () => {
  nav--;
  load();
});
saveButton.addEventListener('click', saveEvent);
cancelButton.addEventListener('click', closeModal);
deleteButton.addEventListener('click', deleteEvent);
closeButton.addEventListener('click', closeModal);

//functions
function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');
    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = '';
  deleteEventModal.style.display = '';
  backDrop.style.display = '';
  eventTitleInput.value = '';
  clicked = null;
  load();
}

function openModal(date) {
  clicked = date;
  const eventForDay = events.find(e => e.date === clicked);
  if (eventForDay) {
    document.querySelector('#eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }
  backDrop.style.display = 'block';
}

function load() {
  const date = new Date();
  const month = date.getMonth() + nav;
  const year = date.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const weekdayCurrent = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
  });
  const paddingDays = weekdays.indexOf(weekdayCurrent);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  updateCalendar(paddingDays, daysInMonth);
  updateMonth(month);
}

function updateCalendar(paddingDays, daysInMonth) {
  const date = new Date();

  calendar.innerHTML = '';
  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const dayString = `${i - paddingDays}/${
      date.getMonth() + nav + 1
    }/${date.getFullYear()}`;
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    if (i > paddingDays) {
      const eventForDay = events.find(e => e.date === dayString);
      daySquare.innerText = i - paddingDays;

      if (i - paddingDays === date.getDate() && nav === 0) {
        console.log(daySquare);
        daySquare.id = 'currentDay';
      }

      daySquare.addEventListener('click', () => openModal(dayString));
      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }
    } else {
      daySquare.classList.add('padding');
    }
    calendar.appendChild(daySquare);
  }
}
function updateMonth(month) {
  const date = new Date();
  date.setMonth(month);
  displayMonth.innerText = `${date.toLocaleDateString('en-us', {
    month: 'long',
  })} ${date.getFullYear()}`;
}
