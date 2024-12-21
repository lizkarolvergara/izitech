
const ResumenCompra = ({ cart }) => {
  // Calcular el total de los productos
  const total = cart.reduce((total, item) => total + item.cantidad * item.precio, 0);

  return (
    <div>
      <div className="resumen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="18"
          height="18"
          strokeWidth="2"
        >
          <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
          <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
          <path d="M17 17h-11v-14h-2"></path>
          <path d="M6 5l14 1l-1 7h-13"></path>
        </svg>
        <span>Resumen de la compra</span>
      </div>

      <div className="tablecompra">
        {/* Mostrar los productos agregados al carrito */}
        <table>
          <tbody>
            {cart.map((item) => (
              <tr key={item.idProducto}>
                <td>{item.nombreProducto}</td>
                <td className="bold">{item.cantidad}</td>
                <td className="bold">
                  S/{" "}
                  {(item.precio * item.cantidad).toLocaleString("es-PE", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
              
            ))}
            <tr>
              <td>Delivery</td>
              <td></td>
              <td className="bold"></td>
            </tr>
            <tr>
              <td>Subtotal</td>
              <td></td>
              <td className="bold">
                S/{" "}
                {total.toLocaleString("es-PE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResumenCompra;
