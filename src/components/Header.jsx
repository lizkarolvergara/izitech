import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "./CartContext"; // Importar el hook del contexto del carrito
import "../../public/css/general.css";

const Header = () => {
  // Crear un estado para almacenar el usuario
  const [usuario, setUsuario] = useState(null);
  const [isFixed, setIsFixed] = useState(false); // Estado para manejar si el header está fijo
  const { cart } = useCart(); // Obtener el carrito del contexto
  const location = useLocation(); // Obtener la ruta actual



  // UseEffect para sincronizar el estado con localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null); // Actualizar el estado a null
    window.location.href = '/'
  };

    // UseEffect para manejar la funcionalidad de fijar el header al hacer scroll
  useEffect(() => {
    const barra = document.querySelector("header");
    const body = document.querySelector("body");

    const handleScroll = () => {
      if (location.pathname !== "/checkout" && location.pathname !== "/payment") {
        // Verificamos si la parte inferior del header está fuera de la vista
        if (barra.getBoundingClientRect().top <= 0) {
          setIsFixed(true); // Si el header está fuera de la vista, fijamos el header
          body.classList.add("body-scroll");
        } else {
          setIsFixed(false); // Si el header está visible, lo dejamos en su posición normal
          body.classList.remove("body-scroll");
        }
      }

    };

    window.addEventListener("scroll", handleScroll);

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  // Calcular la cantidad total de tipos de productos en el carrito
  const cantidadCarrito = new Set(cart.map(item => item.idProducto)).size; // Contar productos únicos por su ID

  return (
    <header className={isFixed ? "fijo" : ""}> {/* Aplicamos la clase fijo dinámicamente */}
      <div className="header">
        <Link to="/">
          <img src="../../backend/images/izitech.png" alt="Izitech Logo" />
        </Link>
        <div className="header-left">
          <div className="header__search">
            <form
              role="search"
              method="get"
              action=""
              className="header__search--form"
            >
              <label htmlFor="buscar">
                <input
                  type="search"
                  id="buscar"
                  className="input-inherit"
                  placeholder="Encuentra tu producto"
                  name="s"
                  required
                />
              </label>
              <button type="submit" className="button-inherit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="24"
                  height="24"
                  strokeWidth="2"
                >
                  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                  <path d="M21 21l-6 -6"></path>
                </svg>
              </button>
            </form>
          </div>

          {usuario ? (
            <>
              <div className="user-button">
                <span className="bienvenido">
                  Bienvenido(a) {usuario.nombre}
                </span>
                <button className="button-inherit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-user"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  </svg>
                </button>
                <div className="dropdown-user">
                  {/* <Link to="#">Mis pedidos</Link>
                  <Link to="#">Mis cuenta</Link> */}
                  <Link onClick={handleLogout}>Cerrar sesión</Link>
                </div>
              </div>
            </>
          ) : (
            <div className="buttons">
              <Link to="/iniciar-sesion" className="button-general">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="24"
                  height="24"
                  strokeWidth="2"
                >
                  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                  <path d="M4 13h3l3 3h4l3 -3h3"></path>
                </svg>
                <span>Iniciar Sesión</span>
              </Link>

              <Link to="/registrate" className="button-general">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="24"
                  height="24"
                  strokeWidth="2"
                >
                  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                  <path d="M4 13h3l3 3h4l3 -3h3"></path>
                </svg>
                <span>Regístrate</span>
              </Link>
            </div>
          )}

          <Link to="/carrito" className="button-inherit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="24"
              height="24"
              strokeWidth="2"
            >
              <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
              <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
              <path d="M17 17h-11v-14h-2"></path>
              <path d="M6 5l14 1l-1 7h-13"></path>
            </svg>
            <span className={`cart-count ${cantidadCarrito > 0 ? "show" : ""}`}>{cantidadCarrito}</span>

          </Link>
        </div>
      </div>

      <nav className="navbar">
        <div className="navbar__category">
          <Link to="/smartphones" className="flexcenter">
            <span>Smartphones</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 9l6 6l6 -6" />
            </svg>
          </Link>
          {/* <div className="dropdown-content">
            <Link to="#">Apple</Link>
            <Link to="#">Samsung</Link>
            <Link to="#">Xiaomi</Link>
            <Link to="#">Motorola</Link>
            <Link to="#">Redmi</Link>
          </div> */}
        </div>

        <div className="navbar__category">
          <Link to="/laptops" className="flexcenter">
            <span>Laptops</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 9l6 6l6 -6" />
            </svg>
          </Link>
          {/* <div className="dropdown-content">
            <Link to="#">Asus</Link>
            <Link to="#">HP</Link>
            <Link to="#">MSI</Link>
            <Link to="#">Lenovo</Link>
            <Link to="#">Acer</Link>
          </div> */}
        </div>

        <div className="navbar__category">
          <Link to="/accesorios" className="flexcenter">
            <span>Accesorios</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 9l6 6l6 -6" />
            </svg>
          </Link>
          {/* <div className="dropdown-content">
            <Link to="#">Cámaras web</Link>
            <Link to="#">Teclados</Link>
            <Link to="#">Mouse</Link>
            <Link to="#">Memorias USB</Link>
            <Link to="#">Coolers</Link>
          </div> */}
        </div>
        <div className="navbar__category">
          <Link
            to="https://wa.link/3a3nwa"
            target="_blank"
            rel="noopener noreferrer"
            className="flexcenter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
              <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
            </svg>
            <span>Chatea con nosotros</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
