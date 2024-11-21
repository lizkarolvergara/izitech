import React, { useState } from "react";
import "../../public/css/producto.css";

const ItemDetail = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart({ ...product, quantity }); // Pasa el producto con la cantidad seleccionada al carrito
    } else {
      alert("La cantidad debe ser al menos 1.");
    }
  };

  return (
    <section>
      <div className="flexcenter">
        <div className="uniqueproduct">
          <div className="flexcenter">
            <div className="uniqueproduct__img">
              <img src={product.imagen} alt={product.nombre} />
            </div>
            <div>
              <div className="margin">
                <span className="uniqueproduct__tittle">{product.nombre}</span>
                <span className="marca">{product.marca}</span>
                <span className="disc__price">S/ {product.precio}</span>
              </div>

              <div className="cantidad">
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  max="10"
                  step="1"
                  className="input-number"
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                />
                <span>Máximo 10 unidades</span>
              </div>

              <div className="compra">
                <button
                  className="button-general"
                  id="agregarCarrito"
                  onClick={handleAddToCart}
                >
                  Agregar al carrito
                </button>
                <button className="button-general">
                  Comprar ahora
                </button>
              </div>
              <span>Unidades disponibles +10</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDetail;
