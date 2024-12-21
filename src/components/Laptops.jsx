import { useEffect, useState } from "react";
import '../../public/css/general.css'
import { Link } from "react-router-dom";


const Laptops = () => {
  const [laptops, setLaptops] = useState([]);

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await fetch("http://localhost:5000/productos/laptops");
        const data = await response.json();
        setLaptops(data);
      } catch (error) {
        console.error("Error al obtener productos de laptops:", error);
      }
    };

    fetchLaptops();
  }, []);

  return (
    <main className="flexcenter">

        <div className="gridcenter">
          {laptops.length > 0 ? (
            laptops.map((laptop) => (
              <Link to={`/producto/${laptop.idProducto}`} key={laptop.idProducto} className="product">
                <div className="product__img">
                  <img
                    src={`http://localhost:5000${laptop.imagen}`}
                    alt={laptop.nombreProducto}
                    className="producto-imagen"
                  />
                </div>
                <span className="product__tittle">{laptop.nombreProducto}</span>
                {/* <span className="product__description">{laptop.descripcion}</span> */}
                <span className="product__price">S/ {laptop.precio.toFixed(2)}</span>
                <div className="compra__main">
                {/* <button className="button-general-main" id="agregarCarrito">
                  Agregar al carrito
                </button> */}
              </div>
              </Link>
            ))
          ) : (
            <p>No hay laptops disponibles.</p>
          )}
        </div>
      
    </main>
  );
};

export default Laptops;
