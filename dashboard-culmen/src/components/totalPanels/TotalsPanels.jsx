import { useEffect, useState } from 'react'
import { TotalCard, TotalWrapper } from './TotalStyles'

const TotalsPanels = ( {products , users} ) => {
  
  return (

    <TotalWrapper >

        <TotalCard >
          <p>TOTAL PRODUCTOS</p>
          <span>{products.count}</span>
        </TotalCard>

        <TotalCard >
          <p>TOTAL DE USUARIOS</p> 
          <span>{users.count}</span>
        </TotalCard>

        <TotalCard >
          <p>TOTAL DE CATEGORIAS</p>
          { products.countByCategory && 
          <span> {products.countByCategory.length} </span> 
          } 
        </TotalCard>


    </TotalWrapper>
  )
}

export default TotalsPanels