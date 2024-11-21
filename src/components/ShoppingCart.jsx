
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const { cart, setCart } = useCart(); // Asegúrate de que `setCart` esté disponible

  // Calcular subtotales y total global
  const subtotal = cart.reduce((acc, item) => acc + item.quantity * item.precio, 0);
  const deliveryFee = 15; // Costo fijo de delivery
  const total = subtotal + deliveryFee;

  // Manejar cambios en la cantidad
  const handleQuantityChange = (id, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);

    // Validar cantidad dentro del rango
    if (isNaN(quantity) || quantity < 1 || quantity > 10) return;

    // Actualizar el estado del carrito
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Eliminar un producto del carrito
  const handleRemoveItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <main>
      <div>
        {cart.length === 0 ? (
          <div className="flexcenter">
            <div className="carrito">
              <div className="flexcenter">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-x">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M13 17h-7v-14h-2" />
                  <path d="M6 5l14 1l-1 7h-13" />
                  <path d="M22 22l-5 -5" />
                  <path d="M17 22l5 -5" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mood-sad">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 10l.01 0" />
                  <path d="M15 10l.01 0" />
                  <path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" />
                </svg>
              </div>
              <div className="carrito flexcenter">
                <span className="bold center">Tu carrito de compras está vacío</span>
                <span className="center">Regresa a nuestra página principal y descubre todos nuestros productos</span>
              </div>
              <div className="seeall">
                <Link to="/" className="button-general">Inicio</Link>
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
                    <td className="bold" style={{ width: "30%" }}>Artículo</td>
                    <td className="bold">Precio</td>
                    <td className="bold">Cantidad</td>
                    <td className="bold">Subtotal</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="cartproduct__img">
                          <img src={item.imagen} alt={item.nombre} />
                        </div>
                      </td>
                      <td>{item.nombre}</td>
                      <td>S/ {item.precio}</td>
                      <td>
                        <div className="cantidad-2">
                          <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            max="10"
                            step="1"
                            className="input-number-2"
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                          />
                        </div>
                      </td>
                      <td>S/ {(item.quantity * item.precio).toLocaleString("es-PE", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                      <td>
                        <span className="eliminar" onClick={() => handleRemoveItem(item.id)}>
                          Eliminar
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cartproduct compra-2">
              <span className="resumen">Resumen de la compra</span>
              <table className="tablecompra">
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td className="bold">S/ {subtotal.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                  <tr>
                    <td>Delivery</td>
                    <td className="bold">S/ {deliveryFee}</td>
                  </tr>
                  <tr>
                    <td className="bold">Total</td>
                    <td className="bold">S/ {total.toLocaleString("es-PE", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  </tr>
                </tbody>
              </table>
              <button className="button-general" id="agregarCarrito">Comprar</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ShoppingCart;
