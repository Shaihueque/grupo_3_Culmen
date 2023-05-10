import { useEffect, useState } from 'react'
import './stylesPanels.css'

const TotalsPanelsContainer = () => {

  const [ products , setProducts ] = useState({}); 
  const [ users , setUsers ] = useState({}); 

  useEffect( ()=>{
    const URL_API_PRODUCTS = 'http://localhost:3030/api/products';
    const URL_API_USERS = 'http://localhost:3030/api/users';
      (async()=>{
        const productsResponse = await fetch(URL_API_PRODUCTS).then(res => res.json());
        setProducts(productsResponse);
      })();
      (async()=>{
        const usersResponse = await fetch(URL_API_USERS).then(res => res.json());
        set(usersResponse);
      })();

  } , [])

  return (
    <div className='flexa'>

        <div>
          <p>TOTAL PRODUCTOS</p>
          <span>{products.count}</span>
          

        </div>
        <div>TOTAL DE USUARIOS</div>
        <div>TOTAL DE CATEGORIAS</div>

    </div>
  )
}

export default TotalsPanelsContainer