import data from "../data/data.json"


export const dataHelpers = () => {
  return new Promise((resolve) => {
    setTimeout(()=>{
        resolve(data);
    },500)
  })
}


/* aca si se gestiona errores, porque pueden ingresarse ids no validos */
/* sera usado en el itemdetailcontainer, para que se muestre en producto en base al id seleccionado */
export const getItemById = (id) => {
  return new Promise((resolve, reject) => {
    const item = data.find((element) => element.id === id); /* find es para buscar dentro de data, element es el elemento que recorre la data
    despues comparamos el recorrido.id, que sea igual al id ingresado por parametro  */

    /* si es estrictamente igual, se ejecuta */
    if(item){
        resolve(item)
    } else{
        reject({error:'Producto no encontrado'});
    }
  })
} 







