import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Pedidos = () => {
  const navigate = useNavigate();
  const [carritos, setCarritos] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [selectedCarrito, setSelectedCarrito] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener los carritos al montar el componente
  useEffect(() => {
    fetch("http://localhost:5000/carritos")
      .then((response) => response.json())
      .then((data) => {
        setCarritos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener carritos:", err);
        setError("Error al cargar los carritos");
        setLoading(false);
      });
  }, []);

  // Obtener los detalles de un carrito seleccionado
  const handleCarritoClick = (idCarrito) => {
    setLoading(true);
    fetch(`http://localhost:5000/carritos/${idCarrito}/detalles`)
      .then((response) => response.json())
      .then((data) => {
        setDetalles(data);
        setSelectedCarrito(idCarrito);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener detalles del carrito:", err);
        setError("Error al cargar los detalles del carrito");
        setLoading(false);
      });
  };

  if (loading) {
    return <div style={loadingStyle}>Cargando...</div>;
  }

  if (error) {
    return <div style={errorStyle}>{error}</div>;
  }

  return (
    <div style={containerStyle}>
      <button
        onClick={() => navigate("/admin")}
        style={backButtonStyle}
      >
        Volver al Panel de Administración
      </button>
      <h1 style={titleStyle}>Pedidos</h1>
      <div style={sectionStyle}>
        <ul style={listStyle}>
          {carritos.map((carrito) => (
            <li key={carrito.idCarrito} style={listItemStyle}>
              <button
                onClick={() => handleCarritoClick(carrito.idCarrito)}
                style={carritoButtonStyle}
              >
                Carrito {carrito.idCarrito} - Estado: {carrito.estado}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedCarrito && (
        <div style={sectionStyle}>
          <h2 style={subtitleStyle}>Detalles del Carrito {selectedCarrito}</h2>
          <ul style={listStyle}>
            {detalles.map((detalle) => (
              <li key={detalle.idDetalleCarrito} style={listItemStyle}>
                Producto {detalle.idProducto}: {detalle.cantidad} unidades a S/
                {detalle.precio_unitario}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Estilos inline
const containerStyle = {
  padding: "20px",
  fontFamily: "Arial, sans-serif",
  color: "#333",
  textAlign: "center", // Centra todos los elementos dentro del contenedor
};

const loadingStyle = {
  fontSize: "18px",
  color: "#666",
  margin: "20px",
};

const errorStyle = {
  fontSize: "18px",
  color: "red",
  margin: "20px",
};

const backButtonStyle = {
  backgroundColor: "#007BFF",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginBottom: "20px",
};

const titleStyle = {
  fontSize: "28px",
  marginBottom: "20px",
};

const subtitleStyle = {
  fontSize: "20px",
  marginBottom: "10px",
};

const sectionStyle = {
  marginTop: "20px",
};

const listStyle = {
  listStyleType: "none",
  padding: "0",
};

const listItemStyle = {
  marginBottom: "10px",
};

const carritoButtonStyle = {
  backgroundColor: "#28A745",
  color: "#fff",
  padding: "5px 15px", // Tamaño ajustado
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  display: "inline-block", // Asegura que el botón solo tome el espacio del texto
};

export default Pedidos;
