import { useEffect, useState } from 'react';
import './App.css'; 
import DetailLastProduct from './components/detailLastProduct/DetailLastProduct';
import PanelCategories from './components/panelCategories/PanelCategories';
import ProductsList from './components/productsList/ProductsList';
import TotalsPanels from './components/totalPanels/TotalsPanels';

function App() {

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
        setUsers(usersResponse);
      })();
  } , [])

  return (
    <>
      
      <TotalsPanels products={products} users={users} />
      <DetailLastProduct products={products} />
      <PanelCategories products={products}/>
      <ProductsList products={products} />
    </>
  );
}

export default App
