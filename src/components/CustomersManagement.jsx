import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerManagement = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/clientes")
      .then((response) => {
        setClientes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar los clientes");
        setLoading(false);
        console.error(err);
      });
  }, []);

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "'Roboto', sans-serif",
    },
    header: {
      textAlign: "center",
      color: "#2196F3",
      marginBottom: "30px",
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
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    th: {
      backgroundColor: "#2196F3",
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
    loading: {
      textAlign: "center",
      color: "#757575",
      fontSize: "18px",
    },
    error: {
      textAlign: "center",
      color: "#f44336",
      fontSize: "18px",
    },
  };

  if (loading) {
    return <div style={styles.loading}>Cargando...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <main style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate("/admin")}>
        Volver al Panel de Administración
      </button>
      <h1 style={styles.header}>Lista de Clientes</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Correo</th>
            <th style={styles.th}>Documento</th>
            <th style={styles.th}>Celular</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.idUsuario}>
              <td style={styles.td}>{cliente.idUsuario}</td>
              <td style={styles.td}>
                {cliente.nombres} {cliente.apellidos}
              </td>
              <td style={styles.td}>{cliente.correo}</td>
              <td style={styles.td}>
                {cliente.tipoDocumento} - {cliente.numeroDocumento}
              </td>
              <td style={styles.td}>{cliente.celular}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default CustomerManagement;
