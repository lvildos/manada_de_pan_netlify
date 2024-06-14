document.addEventListener("DOMContentLoaded", () => {
  const clienteAxios = axios.create({
    baseURL: "http://localhost",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
  });

  const registroForm = document.getElementById("registro-form");
  const loginForm = document.getElementById("login-form");

  registroForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
      name: document.getElementById("registro-usuario").value,
      email: document.getElementById("form-email").value,
      password: document.getElementById("registro-contrasena").value,
    };

    try {
      const { data: responseData } = await clienteAxios.post(
        "/api/register",
        data
      );
      console.log("Registration successful", responseData);
    } catch (error) {
      console.error("Error registering", error);
    }
  });

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
      email: document.getElementById("login-usuario").value,
      password: document.getElementById("login-contrasena").value,
    };

    try {
      const { data: responseData } = await clienteAxios.post(
        "/api/login",
        data
      );
      localStorage.setItem("AUTH_TOKEN", responseData.access_token);
      console.log("Login successful", responseData);
    } catch (error) {
      console.error("Error logging in", error);
    }
  });

  const btnPerfil = document.getElementById("btn-perfil");

  // Función para comprobar si el usuario está logueado
  const isLoggedIn = () => {
    const authToken = localStorage.getItem("AUTH_TOKEN");
    return !!authToken; // Devuelve true si existe authToken, false si es null o undefined
  };

  // Función para actualizar el texto del botón
  const actualizarTextoBoton = () => {
    if (isLoggedIn()) {
      btnPerfil.textContent = "Logout";
    } else {
      btnPerfil.textContent = "Login";
    }
  };

  // Llamar a la función al cargar la página
  actualizarTextoBoton();

  // Función para realizar el logout
  async function logout() {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const response = await clienteAxios.get("/api/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Logout successful", response.data);
    } catch (error) {
      console.error(
        "Error during logout",
        error.response ? error.response.data : error.message
      );
      console.log(localStorage.getItem("AUTH_TOKEN"));
    }
  }

  // Escuchar eventos de click en el botón
  btnPerfil.addEventListener("click", () => {
    if (isLoggedIn()) {
      logout();
      localStorage.removeItem("AUTH_TOKEN");
      actualizarTextoBoton();
      console.log("Usuario deslogueado");
    } else {
      console.log("Usuario debe iniciar sesion");
    }
  });

  // const animal_button = document.getElementById("enlace");

  // const animals_list = async () => {
  //   try {
  //     const { data } = await clienteAxios("/api/animals");
  //     console.log(data);
  //     return console.log(data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // animal_button.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   animals_list();
  // });
});
