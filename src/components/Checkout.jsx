import { useState } from "react";
import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalPrice = cart.reduce(
    (total, item) => total + item.cantidad * item.precio,
    0
  );

  const [formData, setFormData] = useState({
    distrito: "",
    direccion: "",
    referencia: "",
    nombre: "",
    correo: "",
    telefono: "",
  });

  const [loading, setLoading] = useState(false); // Estado para controlar el proceso de envío
  const [error, setError] = useState(""); // Estado para almacenar errores de validación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar teléfono: debe ser 9 dígitos y comenzar con 9
    const telefonoValido = /^9\d{8}$/.test(formData.telefono);
    if (!telefonoValido) {
      setError("Número de teléfono inválido.");
      return;
    }
    setError(""); // Limpiar el error si la validación es exitosa

    const productos = cart.map((item) => ({
      idProducto: item.idProducto,
      cantidad: item.cantidad,
      precio_unitario: item.precio,
    }));

    // Obtén los datos del usuario desde el localStorage
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const payload = {
      idUsuario: usuario?.idUsuario || null, // Usa el idUsuario del usuario logeado, si existe
      direccion: formData.direccion,
      nombre: formData.nombre,
      telefono: formData.telefono,
      referencia: formData.referencia,
      productos,
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/confirmar-compra", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Compra confirmada exitosamente. ID Carrito: ${data.idCarrito}`);
        navigate("/payment"); // Redirige al pago o a otra página
      } else {
        alert(`Error: ${data.error || "No se pudo confirmar la compra"}`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Ocurrió un error al procesar la compra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        {/* Logo y Título */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Link to="/">
                <img 
                    src="../../backend/images/izitech.png" 
                    alt="Izitech Logo" 
                    style={{ height: '50px', marginBottom: '10px' }}
                />
            </Link>
            <h2 style={{ color: '#333', fontWeight: 'bold' }}>Completa tu información personal para finalizar la compra</h2>
        </div>

        {/* Formulario de Checkout */}
        <fieldset style={{ margin: '20px auto', padding: '20px', maxWidth: '600px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
            <form onSubmit={handleSubmit}>
                {/* Distrito */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="distrito" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Distrito*</label>
                    <select
                        name="distrito"
                        id="distrito"
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        value={formData.distrito}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Selecciona tu ubicación</option>
                        <option value="Ancon">Ancón</option>
                        <option value="Ate">Ate</option>
                        <option value="Barranco">Barranco</option>
                        <option value="Brena">Breña</option>
                        <option value="Carabayllo">Carabayllo</option>
                        <option value="Chaclacayo">Chaclacayo</option>
                        <option value="Chorrillos">Chorrillos</option>
                        <option value="Cieneguilla">Cieneguilla</option>
                        <option value="Comas">Comas</option>
                        <option value="ElAgustino">El Agustino</option>
                        <option value="Independencia">Independencia</option>
                    </select>
                </div>

                {/* Dirección */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="direccion" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Dirección*</label>
                    <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        placeholder="Ingresa tu dirección"
                        value={formData.direccion}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Referencia */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="referencia" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Referencia*</label>
                    <input
                        type="text"
                        id="referencia"
                        name="referencia"
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        placeholder="Referencia (Ej. Cerca del parque)"
                        value={formData.referencia}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Nombre Completo */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="nombre" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre Completo*</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        placeholder="Ingresa tu nombre completo"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Teléfono */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="telefono" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Teléfono*</label>
                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        placeholder="Ingresa tu número de teléfono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                    />
                    {error && <div style={{ color: 'red', marginTop: '5px' }}>{error}</div>}
                </div>

                {/* Botón Confirmar */}
                <button
                    type="submit"
                    style={{ width: '100%', padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                    disabled={loading}
                >
                    {loading ? "Procesando..." : "Confirmar Compra"}
                </button>
            </form>
        </fieldset>

        {/* Resumen de Compra */}
        <div style={{ margin: '20px auto', maxWidth: '600px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ borderBottom: '2px solid #28A745', paddingBottom: '10px', color: '#28A745' }}>Resumen de Compra</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ddd' }}>Artículo</th>
                        <th style={{ textAlign: 'center', padding: '10px', borderBottom: '2px solid #ddd' }}>Precio</th>
                        <th style={{ textAlign: 'center', padding: '10px', borderBottom: '2px solid #ddd' }}>Cantidad</th>
                        <th style={{ textAlign: 'right', padding: '10px', borderBottom: '2px solid #ddd' }}>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item) => (
                        <tr key={item.idProducto}>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{item.nombreProducto}</td>
                            <td style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid #ddd' }}>S/ {item.precio}</td>
                            <td style={{ textAlign: 'center', padding: '10px', borderBottom: '1px solid #ddd' }}>{item.cantidad}</td>
                            <td style={{ textAlign: 'right', padding: '10px', borderBottom: '1px solid #ddd' }}>
                                S/ {(item.cantidad * item.precio).toLocaleString("es-PE", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ textAlign: 'right', fontWeight: 'bold' }}>
                Total: S/ {totalPrice.toLocaleString("es-PE", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </div>
        </div>
    </div>
  );
};

export default Checkout;
