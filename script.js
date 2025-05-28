const dateEl = document.getElementById('date');
const timeEl = document.getElementById('time');
const toggleBtn = document.getElementById('toggle-format');
const toggleThemeBtn = document.getElementById('toggle-theme');

let is24Hour = true; // Default

// Format time parts (like minutes, seconds) to always show two digits
function padZero(n) {
  // Convert number n to string
  // If the string length is less than 2, pad '0' to the left until length is 2
  // For example, padZero(5) returns "05"
  return n.toString().padStart(2, '0');
}

function updateDateTime() {
  const now = new Date(); // Get current date and time

  // Format the date string using US English locale, including:
  // weekday (full name, e.g. Monday)
  // year (4 digits, e.g. 2025)
  // month (full name, e.g. May)
  // day (numeric, e.g. 28)
  const dateStr = now.toLocaleDateString('en-UK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  let hours = now.getHours();
  let ampm = '';

  if(!is24Hour) {
    // Convert 24-hour to 12-hour format with AM/PM
    ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // If the result after conversion is 0, it means the original time was midnight (0 o'clock). In the 12-hour format, we should display it as 12, so we replace it with 12
  }
  // Format the time string with hours, minutes, and seconds,
  // each padded to two digits using padZero function,
  // joined by colon, e.g. "09:05:07"
  const timeStr = `${padZero(hours)}:${padZero(now.getMinutes())}:${padZero(now.getSeconds())}${is24Hour ? '' : ' ' + ampm}`;

  // Set the formatted date string to the date element on the page
  dateEl.textContent = dateStr;
  // Set the formatted time string to the time element on the page
  timeEl.textContent = timeStr;
}

toggleBtn.addEventListener('click', () => {
  is24Hour = !is24Hour;
  toggleBtn.textContent = is24Hour ? 'Switch to 12-hour': 'Switch to 24-hour';
  updateDateTime();
});

// Set initial button text
toggleBtn.textContent = 'Switch to 12-hour';
// Initial call to display date and time immediately

if(localStorage.getItem('is24Hour') !== null) {
  is24Hour = localStorage.getItem('is24Hour') === 'true';
}

if(localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
  toggleThemeBtn.textContent = 'Dark Mode';
}

toggleThemeBtn.addEventListener('click', ()=>{
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  toggleThemeBtn.textContent = isLight ? 'Dark Mode' : 'Light Mode';
  localStorage.setItem('theme', isLight ? 'light':'dark')
})
updateDateTime();
// Update every second
setInterval(updateDateTime, 1000)