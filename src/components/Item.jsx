import { Link } from "react-router-dom"

const Item = ({producto}) => {
  return (
    <Link className="product" to={`/product/${producto.id}`}>
        <div className="product__img">
            <img src={producto.imagen}/>
        </div> 	    
        <span className="product__tittle">{producto.nombre}</span>
        <span className="product__price">S/ {producto.precio}</span>
    </Link>
    
  )
}

export default Item
