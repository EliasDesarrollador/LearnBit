// === ELEMENTOS DEL DOM ===
const lessonContent = document.getElementById('lessonContent');
const completeBtn = document.getElementById('completeBtn');
const statusMsg = document.getElementById('statusMsg');
const progressList = document.getElementById('progressList');
const logoutBtn = document.getElementById('logoutBtn');
const header = document.querySelector("header");

// === USUARIO LOGUEADO ===
const loggedUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (!loggedUser) {
  window.location.href = 'index.html'; // redirigir si no está logueado
}

// === MOSTRAR NOMBRE DEL USUARIO ===
const userTitle = document.createElement("h2");
userTitle.textContent = `👋 Hola !!, ${loggedUser.username}`;
header.insertBefore(userTitle, logoutBtn);

// === RELOJ EN TIEMPO REAL ===
const clock = document.createElement("p");
clock.style.fontWeight = "500";
clock.style.fontSize = "0.9rem";
clock.style.color = "#1e3a8a";
header.appendChild(clock);

function updateClock() {
  const now = new Date();
  clock.textContent = `🕒 ${now.toLocaleTimeString()}`;
}
setInterval(updateClock, 1000);
updateClock();

// === ARRAY DE LECCIONES ===
const lessons = [
  {
    titulo: "Variables en JavaScript",
    explicacion: "Las variables sirven para guardar datos. Se pueden declarar con `let`, `const` o `var`. Hoy en día se recomienda usar `let` o `const`.",
    ejemplo: "let nombre = 'Elías';",
    extra: "Tip: Usá `const` siempre que no necesites cambiar el valor."
  },
  {
    titulo: "Qué es una función",
    explicacion: "Una función es un bloque de código que se puede reutilizar. Ayuda a organizar mejor tu programa.",
    ejemplo: "function saludar() {\n  alert('Hola');\n}",
    extra: "Podés llamarla cuando quieras: `saludar();`"
  },
  {
    titulo: "Arrays (Arreglos)",
    explicacion: "Los arrays almacenan listas de datos. Son súper útiles para trabajar con colecciones.",
    ejemplo: "let frutas = ['manzana', 'banana', 'naranja'];",
    extra: "Podés acceder por índice: `frutas[0]` es 'manzana'."
  },
  {
    titulo: "Condicionales (if/else)",
    explicacion: "Te permiten ejecutar código dependiendo de una condición.",
    ejemplo: "if (edad >= 18) {\n  alert('Sos mayor');\n} else {\n  alert('Sos menor');\n}",
    extra: "También podés usar `else` para lo contrario."
  },
];

// === MOSTRAR LECCIÓN DEL DÍA ===
function mostrarLeccion() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const leccion = lessons[dayOfYear % lessons.length];

  lessonContent.innerHTML = '';

  // Título
  const titulo = document.createElement('h3');
  titulo.textContent = `📘 Tema: ${leccion.titulo}`;
  titulo.style.color = '#1d4ed8';
  lessonContent.appendChild(titulo);

  // Explicación
  const explicacion = document.createElement('p');
  explicacion.textContent = leccion.explicacion;
  explicacion.style.marginTop = '0.5rem';
  lessonContent.appendChild(explicacion);

  // Ejemplo
  const ejemplo = document.createElement('pre');
  ejemplo.textContent = leccion.ejemplo;
  ejemplo.style.background = '#e0f2fe';
  ejemplo.style.padding = '0.7rem';
  ejemplo.style.borderRadius = '6px';
  ejemplo.style.marginTop = '0.7rem';
  ejemplo.style.whiteSpace = 'pre-wrap';
  lessonContent.appendChild(ejemplo);

  // Extra tip
  const extra = document.createElement('p');
  extra.innerHTML = `💡 <em>${leccion.extra}</em>`;
  extra.style.marginTop = '0.7rem';
  extra.style.color = '#4b5563';
  lessonContent.appendChild(extra);
}

mostrarLeccion();

// === PROGRESO ===
let progreso = loggedUser.progreso || [];
const todayStr = new Date().toLocaleDateString();

if (progreso.includes(todayStr)) {
  completeBtn.disabled = true;
  statusMsg.textContent = "✅ Ya completaste la lección de hoy. ¡Muy bien!";
} else {
  statusMsg.textContent = "";
}


// === MARCAR COMO COMPLETADO ===
completeBtn.addEventListener('click', () => {
  if (!progreso.includes(todayStr)) {
    progreso.push(todayStr);
    loggedUser.progreso = progreso;

    // Guardar actualización en localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const index = users.findIndex(u => u.username === loggedUser.username);
    if (index !== -1) {
      users[index] = loggedUser;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('loggedInUser', JSON.stringify(loggedUser));
    }

    completeBtn.disabled = true;
    statusMsg.textContent = "✅ Lección marcada como completada.";
    updateProgressList();
  }
});

// === MOSTRAR PROGRESO ===
function updateProgressList() {
  progressList.innerHTML = '';
  progreso.forEach(fecha => {
    const li = document.createElement('li');
    li.textContent = `📅 ${fecha}`;
    progressList.appendChild(li);
  });
}

updateProgressList();

// === CERRAR SESIÓN ===
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'index.html';
});
