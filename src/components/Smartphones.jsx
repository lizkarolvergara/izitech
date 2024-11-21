import { Link } from "react-router-dom"
import ItemListContainer from "./ItemListContainer"

const Smartphones = () => {
  return (
    <main>
        {/* IMAGEN */}
        <section>
            <Link to="/smartphones" class="banner">
                <img src="../../public/images/banners/celulares.jpg" alt="Todo celulares" className="banner__categorias"/>
            </Link>
        </section>

        {/* CONTENEDORES */}
        <ItemListContainer minId={1} maxId={3}/>
        <ItemListContainer minId={4} maxId={6}/>
        
    </main>
  )
}

export default Smartphones