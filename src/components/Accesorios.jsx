import { Link } from "react-router-dom"
import ItemListContainer from "./ItemListContainer"


const Accesorios = () => {
  return (
    <main>
        {/* IMAGEN */}
        <section>
            <Link to="/accesorios" class="banner">
                <img src="../../public/images/banners/accesorios1.jpg" alt="Todo accesorios" className="banner__categorias"/>
            </Link>
        </section>

        {/* CONTENEDORES */}
        <ItemListContainer minId={13} maxId={15}/>
        <ItemListContainer minId={16} maxId={18}/>
    </main>
  )
}

export default Accesorios