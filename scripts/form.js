 // Array de productos que contiene objetos con id, nombre y calificación promedio
 const products = [
    {
      id: "fc-1888",
      name: "flux capacitor",
      averagerating: 4.5
    },
    {
      id: "fc-2050",
      name: "power laces",
      averagerating: 4.7
    },
    {
      id: "fs-1987",
      name: "time circuits",
      averagerating: 3.5
    },
    {
      id: "ac-2000",
      name: "low voltage reactor",
      averagerating: 3.9
    },
    {
      id: "jj-1969",
      name: "warp equalizer",
      averagerating: 5.0
    }
  ];

  // Función para llenar el select de productos
  function populateProductSelect() {
    // Selecciona el elemento select usando su ID
    const productSelect = document.getElementById("products");
    
    // Recorre el array de productos
    products.forEach(product => {
      // Crea un nuevo elemento option
      const option = document.createElement("option");
      option.value = product.id; // Asigna el id del producto como valor de la opción
      option.textContent = product.name; // Asigna el nombre del producto como texto de la opción
      productSelect.appendChild(option); // Agrega la opción al select
    });
  }

  // Llama a la función para llenar el select cuando se carga la página
  populateProductSelect();

  // Clave para almacenar el contador de reseñas en localStorage
  const reviewCounterKey = "reviewCounter";

  // Función que se ejecuta cuando se carga la página
  window.onload = function() {
    // Obtiene el contador actual de reseñas del localStorage, o 0 si no existe
    const currentCount = localStorage.getItem(reviewCounterKey) || 0;
    // Incrementa el contador en 1 y lo guarda nuevamente en localStorage
    localStorage.setItem(reviewCounterKey, Number(currentCount) + 1);
  };


  // Función para mostrar la fecha de la última modificación
  function showLastModified() {
    // Obtiene la fecha de la última modificación del documento
    const lastModified = document.lastModified; 
    // Selecciona el elemento donde se mostrará la fecha
    const lastModifiedElement = document.getElementById("lastModified");
    // Establece el contenido del elemento con la fecha
    lastModifiedElement.textContent = `Last modified: ${lastModified}`;
  }

  // Llama a la función para mostrar la última modificación cuando se carga la página
  window.onload = function() {
    // Llamadas a las funciones existentes
    populateProductSelect(); // Llenar el select de productos
    showLastModified(); // Mostrar la fecha de última modificación
  };
