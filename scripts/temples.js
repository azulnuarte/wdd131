// Función para manejar el menú hamburguesa
document.getElementById('menuToggle').addEventListener('click', function() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active'); // Alterna la clase 'active' para mostrar/ocultar el menú
});

// Función para actualizar el año actual en el footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Función para mostrar la fecha de la última modificación
document.getElementById('lastModified').textContent = document.lastModified;
