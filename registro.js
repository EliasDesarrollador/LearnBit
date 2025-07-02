const registerForm = document.getElementById('registerForm');
const errorMsg = document.getElementById('error-msg');
const successMsg = document.getElementById('success-msg');

registerForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = registerForm.username.value.trim();
    const password = registerForm.password.value.trim();
    const password2 = registerForm.password2.value.trim();

    errorMsg.textContent = '';
    successMsg.textContent = '';

    // Validar que las contraseñas coincidan
    if(password !== password2) {
        errorMsg.textContent = 'Las contraseñas no coinciden.';
        return;
    }

    // Traer usuarios del localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar si usuario ya existe
    if(users.some(u => u.username === username)) {
        errorMsg.textContent = 'El usuario ya existe, probá con otro.';
        return;
    }

    // Guardar nuevo usuario
    users.push({ username, password, progreso: [] });
    localStorage.setItem('users', JSON.stringify(users));

    successMsg.textContent = 'Usuario registrado con éxito. Podés iniciar sesión.';
    registerForm.reset();
});
