import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get("http://localhost:5000/test-db");
        setTables(response.data);
      } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
      }
    };

    fetchTables();
  }, []);

  return (
    <div>
      <h1>Tablas en la Base de Datos:</h1>
      <ul>
        {tables.map((table, index) => (
          <li key={index}>{table.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
