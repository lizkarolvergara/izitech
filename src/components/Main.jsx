import { Link } from "react-router-dom"
/* import ItemListContainer from "./ItemListContainer"
import Productos from "./Productos" */
import DestacadosLaptops from "./DestacadosLaptops"
import DestacadosSmartphones from "./DestacadosSmartphones"
import DestacadosAccesorios from "./DestacadosAccesorios"

const Main = () => {
  return (
    <main>
        {/* IMAGEN */}
        <section>
            <Link to="/smartphones" class="banner">
                <img src="../../backend/images/banners/1.png" alt="Todo celulares" className="banner__img"/>
            </Link>
        </section>

        {/* CONTENEDORES */}
        {/* <ItemListContainer minId={1} maxId={3}/>
        <div className="seeall">
            <Link to="/smartphones" className="button-general">Ver todo</Link>
        </div> */}
        <DestacadosSmartphones/>
        

        {/* IMAGEN */}
        <section>
            <Link to="/laptops" class="banner">
                <img src="../../backend/images/banners/2.png" alt="Todo Laptops" className="banner__img"/>
            </Link>
        </section>


        {/* CONTENEDORES */}
        {/* <ItemListContainer minId={7} maxId={9}/>
        <div className="seeall">
            <Link to="/laptops" className="button-general">Ver todo</Link>
        </div> */}
        <DestacadosLaptops/>

        {/* IMAGEN */}
        <section>
            <Link to="/accesorios" class="banner">
                <img src="../../backend/images/banners/3.png" alt="Todo Accesorios" className="banner__img"/>
            </Link>
        </section>


        {/* CONTENEDORES */}
        {/* <ItemListContainer minId={13} maxId={15}/>
        <div className="seeall">
            <Link to="/accesorios" className="button-general">Ver todo</Link>
        </div> */}
        <DestacadosAccesorios/>

    </main>
  )
}

export default Main
