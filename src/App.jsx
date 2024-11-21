import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import ItemDetailContainer from './components/ItemDetailContainer';
import ShoppingCart from './components/ShoppingCart';
import { CartProvider } from './components/CartContext';
import Smartphones from './components/Smartphones';
import Laptops from './components/Laptops';
import Accesorios from './components/Accesorios';


function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product/:id" element={<ItemDetailContainer />} />
          <Route path="/carrito" element={<ShoppingCart />} />
          <Route path="/smartphones" element={<Smartphones/>} />
          <Route path="/laptops" element={<Laptops/>} />
          <Route path="/accesorios" element={<Accesorios/>  } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
