import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Smartphones = () => {
  const [smartphones, setSmartphones] = useState([]);

  useEffect(() => {
    const fetchSmartphones = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/productos/smartphones"
        );
        const data = await response.json();
        setSmartphones(data);
      } catch (error) {
        console.error("Error al obtener productos de smartphones:", error);
      }
    };

    fetchSmartphones();
  }, []);

  return (
    <main className="flexcenter">

      <div className="gridcenter">
        {smartphones.length > 0 ? (
          smartphones.map((smartphone) => (
            <Link to={`/producto/${smartphone.idProducto}`} key={smartphone.idProducto} className="product">
              <div className="product__img">
                <img
                  src={`http://localhost:5000${smartphone.imagen}`}
                  alt={smartphone.nombre}
                  className="producto-imagen"
                />
              </div>
              <span className="product__tittle">{smartphone.nombre}</span>
              {/* <span className="product__description">{smartphone.descripcion}</span> */}
              <span className="product__price">
                S/ {smartphone.precio.toFixed(2)}
              </span>
              {/* INFORMACINO ADICIONAL POR RODRIGO */}
              {/* <div className="compra__main">
                <button className="button-general-main" id="agregarCarrito">
                  Agregar al carrito
                </button>
              </div> */}
            </Link>
          ))
        ) : (
          <p>No hay smartphones disponibles.</p>
        )}
      </div>
    </main>
  );
};

export default Smartphones;
