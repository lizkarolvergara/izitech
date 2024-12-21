import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterNewProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    precioVenta: "",
    cantidad: "",
    precioCompra: "",
    idCategoria: "",
    idMarca: "",
    imagen: "",
  });

  const [productos, setProductos] = useState([]);

  // Función para obtener la lista de productos
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
      fetchProductos(); // Actualizar la lista de productos
      navigate("/admin");
    } catch (error) {
      console.error("Error al registrar el producto:", error);
      alert("Hubo un error al registrar el producto.");
    }
  };

  return (
    <main style={{ padding: "20px", fontFamily: "Arial, sans-serif", color: "#333" }}>
      <button
        onClick={() => navigate("/admin")}
        style={{
          backgroundColor: "#007BFF",
          color: "#fff",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Volver al Panel de Administración
      </button>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Registrar Nuevo Producto</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input name="codigo" placeholder="Código" onChange={handleChange} required style={inputStyle} />
        <input name="nombre" placeholder="Nombre" onChange={handleChange} required style={inputStyle} />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          onChange={handleChange}
          required
          style={{ ...inputStyle, height: "80px" }}
        />
        <input
          type="number"
          name="precioVenta"
          placeholder="Precio de Venta"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="number"
          name="precioCompra"
          placeholder="Precio de Compra"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="number"
          name="idCategoria"
          placeholder="ID Categoría"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="number"
          name="idMarca"
          placeholder="ID Marca"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input name="imagen" placeholder="URL de Imagen" onChange={handleChange} required style={inputStyle} />
        <button
          type="submit"
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Registrar Producto
        </button>
      </form>

      <h2 style={{ textAlign: "center", marginTop: "40px" }}>Lista de Productos</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            {["Código", "Nombre", "Descripción", "Precio Venta", "Stock", "Imagen (URL)"].map((header) => (
              <th
                key={header}
                style={{
                  borderBottom: "2px solid #ddd",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.idProducto}>
              <td style={cellStyle}>{producto.codigo}</td>
              <td style={cellStyle}>{producto.nombre}</td>
              <td style={cellStyle}>{producto.descripcion}</td>
              <td style={cellStyle}>{producto.precioVenta}</td>
              <td style={cellStyle}>{producto.stock}</td>
              <td style={cellStyle}>{producto.imagen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

const inputStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  width: "100%",
  boxSizing: "border-box",
};

const cellStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

export default RegisterNewProduct;
