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
      document.getElementById("btnCerrarSesion").style.display = "list-item";
      document.getElementById("btnIniciarSesion").style.display = "none";

      // Mostrar enlace a admin solo si el usuario es administrador
      if (data.rol === "Administrador") {
        const linkAdmin = document.getElementById("linkAdmin");
        if (linkAdmin) {
          linkAdmin.style.display = "list-item";
        }
      }
    } else {
      // No autenticado
      document.getElementById("btnCerrarSesion").style.display = "none";
      document.getElementById("btnIniciarSesion").style.display = "list-item";
    }
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
  }
});



///carga dinamicamente la imagen de inicio de psicologa

 document.addEventListener('DOMContentLoaded', () => {
  fetch('/imagenes_inicio/lista')
    .then(res => res.json())
    .then(data => {
      // Frases dinámicas
      const frases = data.filter(item => item.tipo === 'frase');
      if (frases.length >= 1) document.getElementById('frase1').textContent = frases[0].frase;
      if (frases.length >= 2) document.getElementById('frase2').textContent = frases[1].frase;

      // Imagen principal dinámica
      const imagen = data.find(item => item.tipo === 'principal');
      if (imagen) {
        const imgEl = document.getElementById('imagen-principal');
        imgEl.src = `/uploads/${imagen.nombre_img}`;
      }
    })
    .catch(err => {
      console.error('Error al cargar imagen/frases dinámicas:', err);
    });
});



// carga dinamicamete Servicios:

document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/servicios')
    .then(res => res.json())
    .then(servicios => {
      const contenedor = document.getElementById('contenedor-servicios');

      servicios.forEach(s => {
        const section = document.createElement('section');

       section.innerHTML = `
  <h3>${s.titulo}</h3>
  <div class="img-servicios">
    <img src="/uploads/${s.imagen}" alt="" onerror="this.onerror=null; this.src='/img/default.jpg';">
    <div class="overlay">
      <h3>CREA</h3>
      <p>Salud Mental</p>
      <p>${s.titulo}</p>
    </div>
  </div>
  <p>${s.descripcion}</p>
`;


        contenedor.appendChild(section);
      });
    })
    .catch(err => {
      console.error('Error al cargar servicios:', err);
    });
});


