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

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/imagenes')
        .then(res => res.json())
        .then(data => {
            const inicio = document.querySelector(".contenedor-img");
            const servicios = document.querySelector(".portfolio-servicios");
            const instalaciones = document.querySelector(".galeria");

            data.forEach(img => {
                if (img.seccion === "inicio" && inicio) {
                    inicio.innerHTML = `<img src="${img.url}" alt="Inicio">`;
                }

                if (img.seccion === "servicios" && servicios) {
                    const html = `
                        <section>
                            <h3>${img.titulo}</h3>
                            <div class="img-servicios">
                                <img src="${img.url}" alt="">
                                <div class="overlay">
                                    <h3>CREA</h3>
                                    <p>Salud Mental</p>
                                    <p>${img.descripcion}</p>
                                </div>
                            </div>
                            <p>${img.descripcion}</p>
                        </section>
                    `;
                    servicios.insertAdjacentHTML('beforeend', html);
                }

                if (img.seccion === "instalaciones" && instalaciones) {
                    const html = `
                        <div class="proyecto">
                            <img src="${img.url}" alt="">
                            <div class="overlay">
                                <h3>CREA</h3>
                                <p>Salud Mental</p>
                                <p>${img.descripcion}</p>
                            </div>
                        </div>
                    `;
                    instalaciones.insertAdjacentHTML('beforeend', html);
                }
            });
        });
});

// Función para cerrar sesión

