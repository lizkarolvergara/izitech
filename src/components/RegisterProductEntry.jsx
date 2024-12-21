import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterProductEntry = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    codigo: "",
    cantidad: "",
    precioCompra: "",
    precioVenta: "",
  });

  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/productos");
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/admin/ingreso", form);
      alert(response.data.message);
      fetchProductos();
      navigate("/admin");
    } catch (error) {
      console.error("Error al registrar el ingreso:", error);
      alert("Hubo un error al registrar el ingreso.");
    }
  };

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "'Roboto', sans-serif",
    },
    header: {
      textAlign: "center",
      color: "#4CAF50",
      marginBottom: "30px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      backgroundColor: "#f9f9f9",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    input: {
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      fontSize: "14px",
    },
    button: {
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      padding: "10px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#45a049",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    th: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px",
      border: "1px solid #ddd",
      textAlign: "left",
    },
    td: {
      padding: "10px",
      border: "1px solid #ddd",
      textAlign: "left",
    },
    backButton: {
      marginBottom: "20px",
      padding: "10px",
      backgroundColor: "#f44336",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <main style={styles.container}>
      <button
        style={styles.backButton}
        onClick={() => navigate("/admin")}
      >
        Volver al Panel de Administración
      </button>
      <h1 style={styles.header}>Registrar Ingreso de Producto</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          style={styles.input}
          name="codigo"
          placeholder="Código"
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="number"
          name="precioCompra"
          placeholder="Precio de Compra"
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="number"
          name="precioVenta"
          placeholder="Nuevo Precio de Venta (opcional)"
          onChange={handleChange}
        />
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          type="submit"
        >
          Registrar Ingreso
        </button>
      </form>

      <h2 style={styles.header}>Lista de Productos</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Código</th>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Descripción</th>
            <th style={styles.th}>Precio Venta</th>
            <th style={styles.th}>Stock</th>
            <th style={styles.th}>Imagen (URL)</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.idProducto}>
              <td style={styles.td}>{producto.codigo}</td>
              <td style={styles.td}>{producto.nombre}</td>
              <td style={styles.td}>{producto.descripcion}</td>
              <td style={styles.td}>{producto.precioVenta}</td>
              <td style={styles.td}>{producto.stock}</td>
              <td style={styles.td}>{producto.imagen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default RegisterProductEntry;
