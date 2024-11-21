import Item from "./Item"

/* OBTENER EL PRODUCTO QUE QUERAMOS, ESPECIFICO */
const ItemList = ({product}) => {
  return (
    <section>
        
        <div className="flexcenter">
            {/* el map nos devuelve la cantidad de eleemntos que hay en product, que son los productos recorridos del data.json */}
            {product.map((prod)=><Item producto = {prod} key={prod.id}/>)} {/* independizamos los elementos mendiante la pestaña Item */}
        </div>
        
    </section>
  )
}

export default ItemList
