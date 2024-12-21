import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario || usuario.rol !== "admin") {
      alert("No tienes permiso para acceder aquí.");
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "'Roboto', sans-serif",
    },
    header: {
      textAlign: "center",
      color: "#4CAF50",
      marginBottom: "30px",
    },
    section: {
      backgroundColor: "#f9f9f9",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    sectionHeader: {
      color: "#333",
      marginBottom: "15px",
      fontSize: "18px",
      fontWeight: "bold",
    },
    button: {
      display: "inline-block",
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      marginRight: "10px",
      marginBottom: "10px",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#45a049",
    },
    buttonContainer: {
      textAlign: "center",
    },
    logoutButton: {
      backgroundColor: "#f44336",
      color: "#fff",
    },
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.header}>Panel de Administración</h1>
      <div style={styles.buttonContainer}>
        <button
          style={{ ...styles.button, ...styles.logoutButton }}
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </div>
      <div style={styles.section}>
        <h2 style={styles.sectionHeader}>Administración de productos</h2>
        <div style={styles.buttonContainer}>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            onClick={() => navigate("/admin/register-new-product")}
          >
            Registrar Nuevo Producto
          </button>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            onClick={() => navigate("/admin/register-product-entry")}
          >
            Registrar Ingreso de Producto
          </button>
        </div>
      </div>
      <div style={styles.section}>
        <h2 style={styles.sectionHeader}>Información de clientes</h2>
        <div style={styles.buttonContainer}>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            onClick={() => navigate("/admin/customers-management")}
          >
            Datos de registro
          </button>
        </div>
      </div>
      <div style={styles.section}>
        <h2 style={styles.sectionHeader}>Gestión de Envíos</h2>
        <div style={styles.buttonContainer}>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            onClick={() => navigate("/admin/facturacion")}
          >
            Ver datos de envíos
          </button>
        </div>
      </div>
      <div style={styles.section}>
        <h2 style={styles.sectionHeader}>Gestión de pedidos</h2>
        <div style={styles.buttonContainer}>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            onClick={() => navigate("/admin/pedidos")}
          >
            Ver Pedidos
          </button>
        </div>
      </div>
      <div style={styles.section}>
        <h2 style={styles.sectionHeader}>Gestión de Pagos</h2>
        <div style={styles.buttonContainer}>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            onClick={() => navigate("/admin/pagos")}
          >
            Ver Pagos
          </button>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
