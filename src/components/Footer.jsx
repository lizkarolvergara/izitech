import { Link } from "react-router-dom";
import "../../public/css/general.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer__column">
          <div>
            <img src="../public/images/izitech.png" alt="Izitech logo" />
          </div>
          <div>
            <span>Sigue nuestras redes</span>
          </div>
          <div>
            <Link to="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icon-tabler-brand-instagram"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                <path d="M16.5 7.5v.01" />
              </svg>
            </Link>
            <Link to="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icon-tabler-brand-facebook"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
              </svg>
            </Link>
            <Link to="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icon-tabler-brand-tiktok"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="footer__column">
          <span className="bold">Atención al cliente</span>
          <ul className="footer__column--list">
            <li>
              <Link to="#">Preguntas frecuentes</Link>
            </li>
            <li>
              <Link to="#">Métodos de pago</Link>
            </li>
            <li>
              <Link to="#">Políticas de privacidad</Link>
            </li>
            <li>
              <Link to="#">Términos y condiciones</Link>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <span className="bold">Sobre nosotros</span>
          <ul className="footer__column--list">
            <li>
              <Link to="#">Nosotros</Link>
            </li>
            <li>
              <Link to="#">Contacto</Link>
            </li>
            <li>
              <Link to="#">Blogs</Link>
            </li>
            <li>
              <Link to="#">Facturación electrónica</Link>
            </li>
          </ul>
        </div>

        <div className="footer__column">
          <span className="bold">Mi cuenta</span>
          <ul className="footer__column--list">
            <li>
              <Link to="/misdatos">Mis datos</Link>
            </li>
            <li>
              <Link to="/misdirecciones">Mis direcciones</Link>
            </li>
            <li>
              <Link to="/mispedidos">Mis pedidos</Link>
            </li>
            <li>
              <Link to="/clubIzitech">Club Izitech</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
