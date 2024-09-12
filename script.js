document.addEventListener("DOMContentLoaded", function() {
    console.log("Página cargada completamente");

    // Muestra el formulario de registro y oculta el de inicio de sesión
    window.showRegisterForm = function() {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
    };

    // Muestra el formulario de inicio de sesión y oculta el de registro
    window.showLoginForm = function() {
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    };

    // Simula el proceso de inicio de sesión
    window.login = function() {
        // Aquí puedes agregar la lógica de validación
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('content').style.display = 'block'; // Muestra el contenido principal
    };

    // Simula el proceso de registro
    window.register = function() {
        // Aquí puedes agregar la lógica de validación y almacenamiento
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('content').style.display = 'block'; // Muestra el contenido principal
    };



});


