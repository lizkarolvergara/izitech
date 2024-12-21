import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../public/css/forms.css";

const IniciarSesion = () => {
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });

  const navigate = useNavigate();
  const fromCheckout = localStorage.getItem("fromCheckout"); // Verificar si venía del checkout

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/iniciar-sesion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        // Almacena la información del usuario, guarda también el rol
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        // Redirige según el rol del usuario
        if (data.usuario.rol === "admin") {
          navigate("/admin");
        } else if (fromCheckout) {
          navigate("/checkout"); // Si venía desde el checkout, redirigir allí
        } else {
          navigate("/"); // Si no, ir al inicio
        }

        // Forzar la recarga de la página
        window.location.reload(); // Esta línea recarga la página
      } else {
        alert(data.error || "Error al iniciar sesión.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al enviar los datos.");
    }
  };

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario) {
      if (usuario.rol === "admin") {
        navigate("admin");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  return (
    <main>
      <div className="formulario flexcenter">
        <fieldset>
          <legend style={{ margin: "5px" }}>Iniciar Sesión</legend>
          <form onSubmit={handleSubmit}>
            <div className="form__input">
              <label htmlFor="correo">Correo:</label>
              <input
                type="email"
                id="correo"
                name="correo"
                placeholder="Ingresa tu correo"
                required
                value={formData.correo}
                onChange={handleChange}
              />
            </div>
            <div className="form__input">
              <label htmlFor="contrasena">Contraseña:</label>
              <input
                type="password"
                id="contrasena"
                name="contrasena"
                placeholder="Ingresa tu contraseña"
                required
                value={formData.contrasena}
                onChange={handleChange}
              />
            </div>
            <div className="aligntext">
              <Link to="/RecuperarContrasena" className="textref">
                ¿Olvidaste la contraseña?
              </Link>
            </div>
            <div className="form__button flexcenter">
              <input
                type="submit"
                value="Ingresar"
                className="button-general"
              />
            </div>
            <div className="flexcenter">
              <span>¿No tienes una cuenta?</span>
            </div>
            <div className="form__button flexcenter">
              <Link to="/registrate" className="textref">
                Regístrate
              </Link>
            </div>
          </form>
        </fieldset>
      </div>
    </main>
  );
};

export default IniciarSesion;
