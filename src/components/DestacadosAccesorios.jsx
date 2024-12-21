import { useEffect, useState } from "react";
import "../../public/css/general.css";
import { Link } from "react-router-dom";

const DestacadosAccesorios = () => {
  const [productosAccesorios, setProductosAccesorios] = useState([]);

  useEffect(() => {
    const fetchAccesorios = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/productos/accesorios"
        );
        const data = await response.json();
        setProductosAccesorios(data);
      } catch (error) {
        console.error("Error al obtener productos de accesorios:", error);
      }
    };

    fetchAccesorios();
  }, []);

  return (
    <main>
      {/* Mostrar solo los primeros 3 productos */}
      <div className="flexcenter" style={{ display: "flex" }}>
        {productosAccesorios.slice(0, 3).map((accesorio) => (
          <Link to={`/producto/${accesorio.idProducto}`}>
            <div key={accesorio.idProducto} className="product">
              <div className="product__img">
                <img
                  src={`http://localhost:5000${accesorio.imagen}`}
                  alt={accesorio.nombreProducto}
                  className="producto-imagen"
                />
              </div>
              {/* <span className="product__tittle">{accesorio.nombreProducto}</span>
              <span className="product__description">{accesorio.descripcion}</span> */}
              <span className="product__tittle">{accesorio.descripcion}</span>
              <span className="product__price">
                S/ {accesorio.precio.toFixed(2)}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="seeall">
        <Link to="/accesorios" class="button-general">
          Ver todo
        </Link>
      </div>
    </main>
  );
};

export default DestacadosAccesorios;
