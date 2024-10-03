// Get the current year and last modified date for the footer
const yearElement = document.getElementById('year');
const lastModifiedElement = document.getElementById('last-modified');
yearElement.textContent = new Date().getFullYear();
lastModifiedElement.textContent = document.lastModified;

// Static values for temperature and wind speed
const temp = 8; // degrees Celsius
const windSpeed = 12; // km/h

// Calculate Wind Chill function
function calculateWindChill(temperature, windSpeed) {
  return (
    13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) +
    0.3965 * temperature * Math.pow(windSpeed, 0.16)
  ).toFixed(2);
}

// Display wind chill or N/A
const windChillElement = document.getElementById('wind-chill');
if (temp <= 10 && windSpeed > 4.8) {
  windChillElement.textContent = calculateWindChill(temp, windSpeed) + "°C";
} else {
  windChillElement.textContent = "N/A";
}
