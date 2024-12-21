import { useEffect, useState } from "react";
import "../../public/css/general.css";
import { Link } from "react-router-dom";

const DestacadosLaptops = () => {
  const [productosLaptops, setProductosLaptops] = useState([]);

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await fetch("http://localhost:5000/productos/laptops");
        const data = await response.json();
        setProductosLaptops(data);
      } catch (error) {
        console.error("Error al obtener productos de laptops:", error);
      }
    };

    fetchLaptops();
  }, []);

  return (
    <main>
      {/* Mostrar solo los primeros 3 productos */}
      <div className="flexcenter" style={{ display: "flex" }}>
        {productosLaptops.slice(0, 3).map((laptop) => (
          <Link to={`/producto/${laptop.idProducto}`}>
            <div key={laptop.idProducto} className="product">
              <div className="product__img">
                <img
                  src={`http://localhost:5000${laptop.imagen}`}
                  alt={laptop.nombreProducto}
                  className="producto-imagen"
                />
              </div>
              {/* <span className="product__tittle">{laptop.nombreProducto}</span>
              <span className="product__description">{laptop.descripcion}</span> */}
              <span className="product__tittle">{laptop.descripcion}</span>
              <span className="product__price">
                S/ {laptop.precio.toFixed(2)}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="seeall">
        <Link to="/laptops" class="button-general">
          Ver todo
        </Link>
      </div>
    </main>
  );
};

export default DestacadosLaptops;
