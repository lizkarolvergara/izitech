import { useCart } from "./CartContext"; // Importar el hook
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ResumenCompra from "./ResumenCompra";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Calcular el total de todos los subtotales
  const totalPrice = cart.reduce(
    (total, item) => total + item.cantidad * item.precio,
    0
  );

  // Función para verificar el stock de cada producto
  const verificarStock = async () => {
    for (const item of cart) {
      const response = await fetch(`http://localhost:5000/producto/${item.idProducto}`);
      const data = await response.json();
      
      if (data.error || data.stock < item.cantidad) {
        // Mostrar una alerta en lugar de un mensaje en la página
        alert(`No hay suficiente stock para ${item.nombreProducto}. Solo hay ${data.stock} en stock.`);
        return false; // Si algún producto no tiene suficiente stock, retorna falso
      }
    }
    return true; // Todos los productos tienen suficiente stock
  };

  const handleComprarClick = async () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
      // Si el usuario no está autenticado, redirigir al login
      navigate("/iniciar-sesion");
    } else {
      const stockValido = await verificarStock();
      if (stockValido) {
        // Si el stock es suficiente, redirigir al checkout
        navigate("/checkout");
      }
    }
  };

  return (
    <main>
      {cart.length === 0 ? (
        <div className="flexcenter">
          <div className="carrito">
            <div className="flexcenter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-x"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                <path d="M13 17h-7v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
                <path d="M22 22l-5 -5" />
                <path d="M17 22l5 -5" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-mood-sad"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 10l.01 0" />
                <path d="M15 10l.01 0" />
                <path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" />
              </svg>
            </div>
            <div className="carrito flexcenter">
              <span className="bold center">
                Tu carrito de compras está vacío
              </span>
              <span className="center">
                Regresa a nuestra página principal y descubre todos nuestros
                productos
              </span>
            </div>
            <div className="seeall">
              <Link to="/" className="button-general">
                Inicio
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flexcenter">
          <div className="cartproduct">
            <table className="tablecart">
              <thead>
                <tr>
                  <td style={{ width: "10%" }}></td>
                  <td className="bold" style={{ width: "30%" }}>
                    Artículo
                  </td>
                  <td className="bold">Precio</td>
                  <td className="bold">Cantidad</td>
                  <td className="bold">Subtotal</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.idProducto}>
                    <td>
                      <div className="cartproduct__img">
                        <img
                          src={`http://localhost:5000${item.imagen}`}
                          alt={item.nombreProducto}
                        />
                      </div>
                    </td>
                    <td>{item.nombreProducto}</td>
                    <td>S/ {item.precio}</td>
                    <td>
                      <div className="cantidad-2">{item.cantidad}</div>
                    </td>
                    <td>
                      S/{" "}
                      {(item.cantidad * item.precio).toLocaleString("es-PE", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      <span
                        className="eliminar"
                        onClick={() => removeFromCart(item.idProducto)}
                      >
                        Eliminar
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="button-general" onClick={clearCart}>
              Vaciar carrito
            </button>
          </div>
          <div className="cartproduct compra-2">
            <ResumenCompra cart={cart} />
            <button
              className="button-general"
              id="comprar"
              onClick={handleComprarClick}
            >
              Comprar
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
