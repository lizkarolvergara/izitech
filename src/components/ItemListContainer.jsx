import { useEffect, useState } from "react"
import { dataHelpers } from "../helpers/dataHelpers"
import ItemList from "./ItemList";
import { Link } from "react-router-dom";


const ItemListContainer = ({minId,maxId}) => {
    /* OBTENER TODOS LOS DATOS DE LOS PRODUCTOS, RECORRIENDO EL DATA.JSON A TRAVES DEL DATAHELPERS
    1.EMPEZAMOS CON UN ESTADO INCIAL VACIO, MEDIANTE EL USESTATE
    2.MEDIANTE EL USEEFFECT RECORREMOS CADA UNO DE LOS ELEMENTOS, MEDIANTE EL PARAMETRO DEL .THEN Y LOS MOSTRAMOS
    MEDIANTE EL SET PRODUCT, QUE DESPUES SE ALMACENARA EN EL ARRAY VACIO */
    
    const[product,setProduct] = useState([]); /* DECLARAMOS EL ESTADO INICIAL DE NUESTROS PRODUCTOS (ITEMS) */
    console.log(product)

    
    useEffect(()=>{ /*UseEffect => EFECTOS SECUNDARIOS AL LLAMAR UNA API U OBTENER DATOS */
        dataHelpers() /* conexion al data.json */
        .then((res)=>{ /* variable dentro del parametro, es la que nos permitira recorrer el dataHelpers (vinculado a datos.json) */

          /* FILT */
          const filteredProducts = res.filter((prod)=>prod.id>=minId && prod.id<=maxId);
          setProduct(filteredProducts)
        })
    },[minId,maxId])

    
  return (
    <div>
      <ItemList product = {product}/>
    </div>
  )
}

export default ItemListContainer

