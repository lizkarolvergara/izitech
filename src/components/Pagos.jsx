import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Pagos = () => {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los datos de la tabla PAGO
    const fetchPagos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/pagos");
        setPagos(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error al obtener los datos de pagos.");
        setLoading(false);
      }
    };

    fetchPagos();
  }, []);

  if (loading) {
    return <div style={loadingStyle}>Cargando datos...</div>;
  }

  if (error) {
    return <div style={errorStyle}>{error}</div>;
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
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Lista de Pagos</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            {["ID Pago", "ID Orden Venta", "Método de Pago", "Tipo de Documento", "Número de Documento"].map(
              (header) => (
                <th key={header} style={headerStyle}>
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago) => (
            <tr key={pago.idPago}>
              <td style={cellStyle}>{pago.idPago}</td>
              <td style={cellStyle}>{pago.idOrdenVenta}</td>
              <td style={cellStyle}>{pago.metodo_pago}</td>
              <td style={cellStyle}>{pago.tipo_documento}</td>
              <td style={cellStyle}>{pago.numero_documento}</td>
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

export default Pagos;
