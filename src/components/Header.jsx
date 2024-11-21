import { Link } from 'react-router-dom';
import '../../public/css/general.css';
 
const Header = () => {
    return (
      <header>
        <div className="header">
            <Link to="/">
                <img src="../public/images/izitech.png" alt="Izitech Logo"/>
            </Link>
            <div className="header-left">
                <div className="header__search">
                    <form role="search" method="get" action="" className="header__search--form">
                        <label htmlFor="buscar">
                            <input type="search" id="buscar" className="input-inherit" placeholder="Encuentra tu producto" name="s" required />
                        </label>
                        <button type="submit" className="button-inherit">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                                <path d="M21 21l-6 -6"></path>
                            </svg>
                        </button>
                    </form>
                </div>
                <div>
                    <Link to="/iniciar-sesion" className="button-general">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                            <path d="M4 13h3l3 3h4l3 -3h3"></path>
                        </svg>
                        <span>Iniciar Sesión</span>
                    </Link>
                </div>
                <div>
                    <Link to="/registrate" className="button-general">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                            <path d="M4 13h3l3 3h4l3 -3h3"></path>
                        </svg>
                        <span>Regístrate</span>
                    </Link>
                </div>
       
                <Link to="/carrito" className="button-inherit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                        <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                        <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                        <path d="M17 17h-11v-14h-2"></path>
                        <path d="M6 5l14 1l-1 7h-13"></path>
                    </svg>
                </Link>
       
            </div>
        </div>
 
        <nav className="navbar">
           
            <div className="navbar__category">
                <Link to="/smartphones" className="flexcenter">
                    <span>Smartphones</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M6 9l6 6l6 -6" />
                    </svg>
                </Link>
                <div className="dropdown-content">
                    <Link to="#">Apple</Link>
                    <Link to="#">Samsung</Link>
                    <Link to="#">Xiaomi</Link>
                    <Link to="#">Motorola</Link>
                    <Link to="#">Redmi</Link>
                </div>
            </div>
 
            <div className="navbar__category">
                <Link to="/laptops" className="flexcenter">
                    <span>Laptops</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M6 9l6 6l6 -6" />
                    </svg>
                </Link>
                <div className="dropdown-content">
                    <Link to="#">Asus</Link>
                    <Link to="#">HP</Link>
                    <Link to="#">MSI</Link>
                    <Link to="#">Lenovo</Link>
                    <Link to="#">Acer</Link>
                </div>
            </div>
 
            <div className="navbar__category">
                <Link to="/accesorios" className="flexcenter">
                    <span>Accesorios</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M6 9l6 6l6 -6" />
                    </svg>
                </Link>
                <div className="dropdown-content">
                    <Link to="#">Cámaras web</Link>
                    <Link to="#">Teclados</Link>
                    <Link to="#">Mouse</Link>
                    <Link to="#">Memorias USB</Link>
                    <Link to="#">Coolers</Link>
                </div>
            </div>
            <div className="navbar__category">
                <Link to="https://wa.link/3a3nwa" target="_blank" rel="noopener noreferrer" className="flexcenter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
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