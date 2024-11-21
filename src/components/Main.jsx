import { Link } from "react-router-dom"
import ItemListContainer from "./ItemListContainer"

const Main = () => {
  return (
    <main>
        {/* IMAGEN */}
        <section>
            <Link to="/smartphones" class="banner">
                <img src="../public/images/banners/1.png" alt="Todo celulares" className="banner__img"/>
            </Link>
        </section>

        {/* CONTENEDORES */}
        <ItemListContainer minId={1} maxId={3}/>
        <div className="seeall">
            <Link to="/smartphones" className="button-general">Ver todo</Link>
        </div>

        {/* IMAGEN */}
        <section>
            <Link to="/laptops" class="banner">
                <img src="../public/images/banners/2.png" alt="Todo Laptops" className="banner__img"/>
            </Link>
        </section>


        {/* CONTENEDORES */}
        <ItemListContainer minId={7} maxId={9}/>
        <div className="seeall">
            <Link to="/laptops" className="button-general">Ver todo</Link>
        </div>

        {/* IMAGEN */}
        <section>
            <Link to="/accesorios" class="banner">
                <img src="../public/images/banners/3.png" alt="Todo Accesorios" className="banner__img"/>
            </Link>
        </section>


        {/* CONTENEDORES */}
        <ItemListContainer minId={13} maxId={15}/>
        <div className="seeall">
            <Link to="/accesorios" className="button-general">Ver todo</Link>
        </div>

    </main>
  )
}

export default Main
