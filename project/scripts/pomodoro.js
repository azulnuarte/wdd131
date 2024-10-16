let tiempoPomodoro = 25 * 60; // 25 minutos en segundos
let tiempoDescanso = 5 * 60; // 5 minutos en segundos
let temporizador;
let enDescanso = false;

const reloj = document.getElementById('reloj');
const iniciarBtn = document.getElementById('iniciarBtn');
const detenerBtn = document.getElementById('detenerBtn');
const reiniciarBtn = document.getElementById('reiniciarBtn');

function actualizarReloj() {
    const minutos = Math.floor(tiempoPomodoro / 60);
    const segundos = tiempoPomodoro % 60;
    reloj.textContent = `${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
}

function iniciarTemporizador() {
    iniciarBtn.disabled = true;
    detenerBtn.disabled = false;
    reiniciarBtn.disabled = true;

    temporizador = setInterval(() => {
        if (tiempoPomodoro > 0) {
            tiempoPomodoro--;
        } else {
            clearInterval(temporizador);
            enDescanso = !enDescanso;
            tiempoPomodoro = enDescanso ? tiempoDescanso : 25 * 60; // 5 minutos de descanso o reiniciar el Pomodoro
            alert(enDescanso ? "¡Descanso de 5 minutos!" : "¡Tiempo de trabajo de 25 minutos listo!");
        }
        actualizarReloj();
    }, 1000);
}

function detenerTemporizador() {
    clearInterval(temporizador);
    iniciarBtn.disabled = false;
    detenerBtn.disabled = true;
    reiniciarBtn.disabled = false;
}

function reiniciarTemporizador() {
    detenerTemporizador();
    tiempoPomodoro = 25 * 60; // Reiniciar a 25 minutos
    actualizarReloj();
    reiniciarBtn.disabled = true;
}

iniciarBtn.addEventListener('click', iniciarTemporizador);
detenerBtn.addEventListener('click', detenerTemporizador);
reiniciarBtn.addEventListener('click', reiniciarTemporizador);

actualizarReloj(); // Llamar a la función una vez para mostrar el reloj inicialmente