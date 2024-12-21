import { useEffect, useState } from "react";

const Productos = () => {
  const [productosPorCategoria, setProductosPorCategoria] = useState({});

  useEffect(() => {
    // Obtener productos separados por categorías
    const fetchProductosPorCategoria = async () => {
      try {
        const response = await fetch("http://localhost:5000/productos-por-categoria");
        const data = await response.json();
        setProductosPorCategoria(data);
      } catch (error) {
        console.error("Error al obtener productos por categoría:", error);
      }
    };

    fetchProductosPorCategoria();
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      {Object.keys(productosPorCategoria).length > 0 ? (
            Object.entries(productosPorCategoria).map(([categoria, productos]) => (
          <div key={categoria}>
            <h2>{categoria}</h2>
            <div className="productos-container">
              {productos.map((producto) => (
                <div key={producto.idProducto} className="producto-card">
                  <h3>{producto.nombreProducto}</h3>
                  <p>{producto.descripcion}</p>
                  <p><strong>Precio:</strong> ${producto.precio.toFixed(2)}</p>
                  <p><strong>Stock:</strong> {producto.stock}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </div>
  );
};

export default Productos;
