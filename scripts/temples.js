// Función para manejar el menú hamburguesa
document.getElementById('menuToggle').addEventListener('click', function() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active'); // Alterna la clase 'active' para mostrar/ocultar el menú
});

// Agregar funcionalidad al botón de menú
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open'); // Alterna la clase 'open' para mostrar/ocultar los enlaces
	hamButton.classList.toggle('open');
});

// Función para actualizar el año actual en el footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Función para mostrar la fecha de la última modificación
document.getElementById('lastModified').textContent = document.lastModified;
