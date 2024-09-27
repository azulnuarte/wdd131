document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('year');
    const lastModifiedSpan = document.getElementById('last-modified');

    // Set current year
    yearSpan.textContent = new Date().getFullYear();

    // Set last modified date
    lastModifiedSpan.textContent = document.lastModified;

    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        hamburger.innerHTML = hamburger.innerHTML === '&#9776;' ? '&times;' : '&#9776;'; // Toggle between hamburger and close icon
    });
});
