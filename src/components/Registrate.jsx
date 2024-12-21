import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";


const Registrate = () => {
  const [formData, setFormData] = useState({
    correo: "",
    nombre: "",
    apellido: "",
    documento: "",
    nrodoc: "",
    celular: "",
    contrasena: "",
  });

  const navigate = useNavigate();
  
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
      const response = await fetch("http://localhost:5000/registrate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        /* alert("Usuario registrado exitosamente"); */
        navigate("/registro-exitoso")
        setFormData({
          correo: "",
          nombre: "",
          apellido: "",
          documento: "",
          nrodoc: "",
          celular: "",
          contrasena: "",
        });
      } else {
        alert(data.error || "Error al registrar el usuario.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al enviar los datos.");
    }
  };

  return (
    <main>
      <div className="formulario flexcenter">
        <fieldset>
          <legend style={{margin:'5px'}}>Formulario de registro</legend>
          <form onSubmit={handleSubmit}>
            <div className="form__input">
              <label htmlFor="correo">Correo:</label>
              <input
                type="email"
                name="correo"
                id="correo"
                placeholder="Ingresa tu email"
                required
                value={formData.correo}
                onChange={handleChange}
              />
            </div>
            <div className="form__input">
              <label htmlFor="nombre">Nombres:</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Ingresa tu nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="form__input">
              <label htmlFor="apellido">Apellidos:</label>
              <input
                type="text"
                name="apellido"
                id="apellido"
                placeholder="Ingresa tu apellido"
                required
                value={formData.apellido}
                onChange={handleChange}
              />
            </div>
            <div className="form__input">
              <label htmlFor="documento">Tipo de documento:</label>
              <select
                name="documento"
                className="form__input--select"
                required
                value={formData.documento}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Tipo
                </option>
                <option value="dni">DNI</option>
                <option value="carnet">Carnet de extranjería</option>
              </select>
            </div>
            <div className="form__input">
              <label htmlFor="nrodoc">N° de documento:</label>
              <input
                type="text"
                name="nrodoc"
                placeholder="Ingresa tu número de documento"
                required
                value={formData.nrodoc}
                onChange={handleChange}
              />
            </div>
            <div className="form__input">
              <label htmlFor="celular">Celular:</label>
              <input
                type="text"
                name="celular"
                id="celular"
                placeholder="Ingresa tu número de celular"
                value={formData.celular}
                onChange={handleChange}
              />
            </div>
            <div className="form__input">
              <label htmlFor="contrasena">Contraseña:</label>
              <input
                type="password"
                name="contrasena"
                id="contrasena"
                placeholder="Ingresa una contraseña"
                required
                value={formData.contrasena}
                onChange={handleChange}
              />
            </div>
            <div className="tyc">
              <input type="checkbox" name="tyc" className="checkbox" required />
              <label htmlFor="tyc">
                Al utilizar este formulario, acepta que este sitio web almacene
                y maneje sus datos.
              </label>
            </div>
            <div className="form__button">
              <input type="submit" value="Registrarme" className="button-general" />
            </div>
            <div>
              <span>
                ¿Ya tienes cuenta?{" "}
                <Link to="/iniciar-sesion" className="textref">
                  Inicia sesión
                </Link>
              </span>
            </div>
          </form>
        </fieldset>
      </div>
    </main>
  );
};

export default Registrate;
