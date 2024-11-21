import { Link } from "react-router-dom"
import ItemListContainer from "./ItemListContainer"


const Laptops = () => {
  return (
    <main>
        {/* IMAGEN */}
        <section>
            <Link to="/laptops" class="banner">
                <img src="../../public/images/banners/laptops1.jpg" alt="Todo laptops" className="banner__categorias"/>
            </Link>
        </section>

        {/* CONTENEDORES */}
        <ItemListContainer minId={7} maxId={9}/>
        <ItemListContainer minId={10} maxId={12}/>
        
    </main>
  )
}

export default Laptops