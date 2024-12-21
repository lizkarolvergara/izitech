import { createContext, useState, useContext, useEffect } from 'react';

// Creamos el contexto para el carrito
const CartContext = createContext();

// Proveedor del carrito
export const CartProvider = ({ children }) => {
  // Cargar el carrito desde localStorage o usar un carrito vacío
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  const [cart, setCart] = useState(storedCart); // Inicializar el estado con el valor del localStorage

  // Función para agregar productos al carrito
  const addToCart = (producto, cantidad) => {
    setCart((prevCart) => {
      // Buscar si el producto ya existe en el carrito
      const existingProductIndex = prevCart.findIndex((item) => item.idProducto === producto.idProducto);

      if (existingProductIndex !== -1) {
        // Si el producto ya existe, actualizar la cantidad
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].cantidad += cantidad;
        return updatedCart;
      }

      // Si no existe, agregar el producto al carrito con la cantidad
      return [...prevCart, { ...producto, cantidad }];
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (idProducto) => {
    setCart((prevCart) => prevCart.filter((item) => item.idProducto !== idProducto));
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Guardar el carrito en localStorage cada vez que se actualice
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook para usar el contexto del carrito
export const useCart = () => {
  return useContext(CartContext);
};
