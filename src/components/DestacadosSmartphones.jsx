import { useEffect, useState } from "react";
import "../../public/css/general.css";
import { Link } from "react-router-dom";

const DestacadosSmartphones = () => {
  const [productosSmartphones, setProductosSmartphones] = useState([]);

  useEffect(() => {
    const fetchSmartphones = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/productos/smartphones"
        );
        const data = await response.json();
        setProductosSmartphones(data);
      } catch (error) {
        console.error("Error al obtener productos de smartphones:", error);
      }
    };

    fetchSmartphones();
  }, []);

  return (
    <main>
      {/* Mostrar solo los primeros 3 productos */}
      <div className="flexcenter" style={{ display: "flex" }}>
        {productosSmartphones.slice(0, 3).map((smartphone) => (
          <Link to={`/producto/${smartphone.idProducto}`}>
            <div key={smartphone.idProducto} className="product">
              <div className="product__img">
                <img
                  src={`http://localhost:5000${smartphone.imagen}`}
                  alt={smartphone.nombreProducto}
                  className="producto-imagen"
                />
              </div>
              {/* <span className="product__tittle">{smartphone.nombreProducto}</span>
              <span className="product__description">{smartphone.descripcion}</span> */}
              <span className="product__tittle">{smartphone.descripcion}</span>
              <span className="product__price">
                S/ {smartphone.precio.toFixed(2)}
              </span>

              {/* <div className="compra__main">
              <button className="button-general-main" id="agregarCarrito">
                Agregar al carrito
              </button>
              <Link to={`/producto/${smartphone.idProducto}`} className="button-general-main">Mas Información</Link>
            </div> */}
            </div>
          </Link>
        ))}
      </div>

      <div className="seeall">
        <Link to="/smartphones" class="button-general">
          Ver todo
        </Link>
      </div>
    </main>
  );
};

export default DestacadosSmartphones;
