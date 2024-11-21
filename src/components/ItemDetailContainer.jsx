import { useEffect, useState } from "react";
import { getItemById } from "../helpers/dataHelpers";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { useCart } from "./CartContext"; // Importa el hook useCart

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); // Obtén la función addToCart desde el contexto

  const id = useParams().id;

  useEffect(() => {
    getItemById(Number(id))
      .then((res) => {
        setProduct(res);
      })
      .catch((error) => console.error("Error al obtener el producto:", error));
  }, [id]);

  return (
    <div>
      {product && <ItemDetail product={product} onAddToCart={addToCart} />} {/* Pasa addToCart como prop */}
    </div>
  );
};

export default ItemDetailContainer;
