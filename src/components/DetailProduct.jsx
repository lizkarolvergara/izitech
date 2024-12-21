import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "./CartContext"; // Importa el contexto


const DetailProduct = () => {
  
  const [producto, setProducto] = useState(null);
   const { addToCart } = useCart(); // Hook del contexto del carrito
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const [cantidad, setCantidad] = useState(1);



  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`http://localhost:5000/producto/${id}`);
        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);
      }
    };

    fetchProducto();
  }, [id]);

  const handleAddToCart = () => {
    if (producto) {
      addToCart(producto, cantidad);
    }
  };


  return (
    <main className="detalle-producto">
      {producto ? (
        <div className="flexcenter">
          <div className="uniqueproduct">

              <div className="uniqueproduct__img">
                <img
                  src={`http://localhost:5000${producto.imagen}`}
                  alt={producto.nombreProducto}
                />
              </div>
              <div className="detail__product">
                <div>
                  <span className="uniqueproduct__tittle">{producto.nombreProducto}</span>
                  <div>
                    <span className="disc__price">S/ {producto.precio.toFixed(2)}</span>
                  </div>
                </div>
                <span className="span-descripcion">{producto.descripcion}</span>
                <div className="cantidad">
                  <input
                    type="number"
                    value={cantidad}
                    min="1"
                    max=
                    "5"
                    onChange={(e) => setCantidad(Number(e.target.value))}
                    className="input-number"
                  />
                  <span>Máximo 5 unidades</span>
                </div>
                <div className="compra">
                  <button
                    className="button-general"
                    id="agregarCarrito"
                    onClick={handleAddToCart}
                  >
                    Agregar al carrito
                  </button>
                  <button className="button-general">Comprar ahora</button>
                </div>
                <span>Unidades disponibles {producto.stock}</span>
              </div>
            </div>
          </div>

      ) : (
        <p>Cargando detalles del producto...</p>
      )}
    </main>
  );
};

export default DetailProduct;
