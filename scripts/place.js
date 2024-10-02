document.addEventListener("DOMContentLoaded", function () {
    // Display current year and last modified date
    const currentYear = new Date().getFullYear();
    document.getElementById("currentYear").textContent = currentYear;
    document.getElementById("lastModified").textContent = document.lastModified;

    // Static values for temperature and wind speed
    const temperature = 15; // in Celsius
    const windSpeed = 10; // in km/h

    // Calculate wind chill
    const windChill = calculateWindChill(temperature, windSpeed);
    document.getElementById("windChill").textContent = windChill !== null ? windChill + '°C' : 'N/A';
});

// Wind chill calculation function
function calculateWindChill(temp, speed) {
    if ((temp <= 10 && speed > 4.8) || (temp <= 50 && speed > 3)) {
        return Math.round(13.12 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16));
    }
    return null;
}
