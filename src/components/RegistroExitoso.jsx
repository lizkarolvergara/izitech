
import { Link } from "react-router-dom";

const RegistroExitoso = () => {
  return (
    <main>
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-user-check"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
              <path d="M15 19l2 2l4 -4" />
            </svg>
          </div>
          <div className="carrito flexcenter">
            <span className="bold center">Registro exitoso</span>
            <span className="center">Inicia sesión para continuar</span>
          </div>
          <div className="seeall">
            <Link to="/iniciar-sesion" className="button-general">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegistroExitoso;
