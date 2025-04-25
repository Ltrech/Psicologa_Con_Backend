let menuVisible = false;

// Función que oculta o muestra el menú
function mostrarOcultarMenu() {
    const nav = document.getElementById("nav");
    if (menuVisible) {
        nav.classList.remove("responsive");
        menuVisible = false;
    } else {
        nav.classList.add("responsive");
        menuVisible = true;
    }
}

// Esta función se llama al hacer clic en un enlace del menú
function seleccionar() {
    const nav = document.getElementById("nav");
    nav.classList.remove("responsive");
    menuVisible = false;
}
