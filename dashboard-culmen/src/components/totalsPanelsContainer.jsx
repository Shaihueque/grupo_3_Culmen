import { useEffect, useState } from 'react'
import './stylesPanels.css'

const TotalsPanelsContainer = () => {

  const [ products , setProducts ] = useState({}); 
  const [ users , setUsers ] = useState({}); 
  const [ categories , setCategories ] = useState({});
  //const [ products , setCategory ] = useState({});

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
      (async()=>{
        const categoryResponse = await fetch(URL_API_PRODUCTS).then(res => res.json());
        setCategory(categoryResponse);
      })();
  } , [])

  return (
    <div className='flexa'>

        <div>
          <p>TOTAL PRODUCTOS</p>
          <span>{products.count}</span>
          

        </div>
        <div>TOTAL DE USUARIOS</div>
        <div>
          <p>TOTAL DE CATEGORIAS</p>
          
            products.map{(Product, i) => {
              return (
                <span key={i}>{Product}</span>
            )
          }}

          </div>

    </div>
  )
}

export default TotalsPanelsContainer