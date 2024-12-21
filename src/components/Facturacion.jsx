import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Facturacion = () => {
  const [facturacion, setFacturacion] = useState([]); // Almacena los datos obtenidos
  const [loading, setLoading] = useState(true); // Indica si los datos están cargando
  const [error, setError] = useState(null); // Almacena errores si ocurren
  const navigate = useNavigate(); // Hook para la navegación

  // Obtener datos desde el servidor al montar el componente
  useEffect(() => {
    const fetchFacturacion = async () => {
      try {
        const response = await fetch("http://localhost:5000/facturacion"); // Endpoint del servidor
        if (!response.ok) {
          throw new Error("Error al obtener los datos de facturación");
        }
        const data = await response.json();
        setFacturacion(data); // Guardar datos en el estado
      } catch (err) {
        setError(err.message); // Manejar errores
      } finally {
        setLoading(false); // Finalizar estado de carga
      }
    };

    fetchFacturacion();
  }, []); // Se ejecuta una sola vez al montar el componente

  // Mostrar mensaje mientras se cargan los datos
  if (loading) {
    return <div style={loadingStyle}>Cargando datos de facturación...</div>;
  }

  // Mostrar mensaje si ocurre un error
  if (error) {
    return <div style={errorStyle}>Error: {error}</div>;
  }

  return (
    <div style={containerStyle}>
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
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Datos de envío</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            {["ID Facturación", "ID Orden Venta", "Nombre Facturación", "Dirección", "Referencia", "Teléfono"].map(
              (header) => (
                <th key={header} style={headerStyle}>
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {facturacion.map((item) => (
            <tr key={item.idFacturacion}>
              <td style={cellStyle}>{item.idFacturacion}</td>
              <td style={cellStyle}>{item.idOrdenVenta}</td>
              <td style={cellStyle}>{item.nombreFacturacion}</td>
              <td style={cellStyle}>{item.direccion}</td>
              <td style={cellStyle}>{item.referencia}</td>
              <td style={cellStyle}>{item.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Estilos inline
const containerStyle = {
  padding: "20px",
  fontFamily: "Arial, sans-serif",
  color: "#333",
};

const loadingStyle = {
  fontSize: "18px",
  textAlign: "center",
  margin: "20px",
  color: "#666",
};

const errorStyle = {
  fontSize: "18px",
  textAlign: "center",
  margin: "20px",
  color: "red",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
  fontSize: "16px",
};

const headerStyle = {
  borderBottom: "2px solid #ddd",
  padding: "10px",
  textAlign: "left",
  backgroundColor: "#f4f4f4",
};

const cellStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

export default Facturacion;
