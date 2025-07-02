const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('error-msg');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = loginForm.username.value.trim();
    const password = loginForm.password.value.trim();

    // Traer usuarios del localStorage (simulando base de datos)
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Buscar usuario y contraseña
    const user = users.find(u => u.username === username && u.password === password);

    if(user) {
        // Guardar usuario logueado
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        errorMsg.textContent = '';
        alert('Login exitoso!'); // luego redirigir a home.html
        window.location.href = 'home.html';
    } else {
        errorMsg.textContent = 'Usuario o contraseña incorrectos.';
    }
});
