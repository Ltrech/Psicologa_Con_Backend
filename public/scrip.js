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
function cerrarSesion() {
    fetch("/usuarios/logout", {
        method: "POST",
        credentials: "include"
    })
    .then(() => {
        window.location.href = "/psicologa"; // O tu página principal sin sesión
    })
    .catch((error) => {
        console.error("Error al cerrar sesión:", error);
    });
  }
  
// Esta función se llama al hacer clic en un enlace del menú
function seleccionar() {
    const nav = document.getElementById("nav");
    nav.classList.remove("responsive");
    menuVisible = false;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
      const res = await fetch("/usuarios/perfil");
      if (res.ok) {
          const data = await res.json();

          // Mostrar nombre e imagen
          document.getElementById("perfilUsuario").style.display = "flex";
          document.getElementById("nombreUsuario").textContent = data.nombre;
          document.getElementById("imagenUsuario").src = data.imagen ? `/uploads/${data.imagen}` : "/img/default-profile.png";


          // Mostrar botón "Cerrar sesión", ocultar "Iniciar sesión"
          document.getElementById("btnCerrarSesion").style.display = "block";
          document.getElementById("btnIniciarSesion").style.display = "none";
      } else {
          // Si no hay sesión, asegurarse de mostrar "Iniciar sesión"
          document.getElementById("btnCerrarSesion").style.display = "none";
          document.getElementById("btnIniciarSesion").style.display = "block";
      }
  } catch (error) {
      console.error("Error al obtener el perfil:", error);
  }
});

// Función para cerrar sesión

