import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Accesorios = () => {
  const [accesorios, setAccesorios] = useState([]);

  useEffect(() => {
    const fetchAccesorios = async () => {
      try {
        const response = await fetch("http://localhost:5000/productos/accesorios");
        const data = await response.json();
        setAccesorios(data);
      } catch (error) {
        console.error("Error al obtener productos de accesorios:", error);
      }
    };

    fetchAccesorios();
  }, []);

  return (
    <main className="flexcenter">

        <div className="gridcenter">
          {accesorios.length > 0 ? (
            accesorios.map((accesorio) => (
              <Link to={`/producto/${accesorio.idProducto}`} key={accesorio.idProducto} className="product">
                <div className="product__img">
                  <img
                    src={`http://localhost:5000${accesorio.imagen}`}
                    alt={accesorio.nombre}
                    className="producto-imagen"
                  />
                </div>
                <span className="product__tittle">{accesorio.nombre}</span>
                {/* <span className="product__description">{accesorio.descripcion}</span> */}
                <span className="product__price">S/ {accesorio.precio.toFixed(2)}</span>
                {/* <div className="compra__main">
                  <button className="button-general-main" id="agregarCarrito">
                    Agregar al carrito
                  </button>
                </div> */}
              </Link>
            ))
          ) : (
            <p>No hay accesorios disponibles.</p>
          )}
        </div>
    </main>
  );
};

export default Accesorios;
