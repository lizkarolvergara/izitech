import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Smartphones from "./components/Smartphones";
import Laptops from "./components/Laptops";
import Accesorios from "./components/Accesorios";
import IniciarSesion from "./components/IniciarSesion";
import Registrate from "./components/Registrate";
import RegistroExitoso from "./components/RegistroExitoso";
import DetailProduct from "./components/DetailProduct";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
/* import Pago from "./components/Payment"; */
import AdminDashboard from "./components/AdminDashboard";
import RegisterNewProduct from "./components/RegisterNewProduct";
import RegisterProductEntry from "./components/RegisterProductEntry";
import Payment from "./components/Payment";
import Comprobante from "./components/Comprobante";
import CustomersManagement from "./components/CustomersManagement";
import Pedidos from "./components/Pedidos";
import Facturacion from "./components/Facturacion";
import Pagos from "./components/Pagos";

const AdminRoutes = ({ children }) => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario || usuario.rol !== "admin") {
    return <div>No tienes acceso a esta página.</div>;
  }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas principales */}
        <Route
          path="*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/product/:id" element={<ItemDetailContainer />} />
                <Route path="/smartphones" element={<Smartphones />} />
                <Route path="/laptops" element={<Laptops />} />
                <Route path="/accesorios" element={<Accesorios />} />
                <Route path="/iniciar-sesion" element={<IniciarSesion />} />
                <Route path="/registrate" element={<Registrate />} />
                <Route path="/registro-exitoso" element={<RegistroExitoso />} />
                <Route path="/producto/:id" element={<DetailProduct />} />
                <Route path="/carrito" element={<Cart />} />
              </Routes>
              <Footer />
            </>
          }
        />

        {/* Ruta sin Header y Footer */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/comprobante" element={<Comprobante />} />
  

        {/* Rutas exclusivas para el administrador */}
        <Route
          path="/admin/*"
          element={
            <AdminRoutes>
              <Routes>
                <Route path="" element={<AdminDashboard />} />
                {/* Puedes agregar más rutas de administrador aquí */}
                <Route
                  path="register-new-product"
                  element={<RegisterNewProduct />}
                />
                <Route
                  path="register-product-entry"
                  element={<RegisterProductEntry />}
                />
              <Route
                path="facturacion"
                element={<Facturacion />}
              />
              <Route
                path="customers-management"
                element={<CustomersManagement />}
              />
              <Route
                path="pedidos"
                element={<Pedidos />}
              />
              <Route
                path="pagos"
                element={<Pagos />}
              />
            </Routes>
            </AdminRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
