const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("login-form").addEventListener("submit", async(e) => { // (e) es el evento
    e.preventDefault();

    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;
    
    // Nos comunicamos con nuestro backend usando fetch
    const res = await fetch("/usuarios/login", {

        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          user, password
        })
      });
      
    if(!res.ok) return mensajeError.classList.toggle("invisible_visible", false);
    const resJson = await res.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }
})