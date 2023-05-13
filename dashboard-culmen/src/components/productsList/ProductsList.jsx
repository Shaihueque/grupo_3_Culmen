import React from 'react'
import { TableContainer, Table, Th, Tr, Td, DetailLink } from './ProductsListStyles'

const ProductsList = ( { products } ) => {
  console.log(products)
  return (
    <TableContainer>
    <Table>
      <thead>
        <tr>
          <Th>Id</Th>
          <Th>Name</Th>
          <Th>Description</Th>
          {/* <Th>Link</Th> */}
        </tr>
      </thead>
      <tbody>
        {
          products.products &&
          products.products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.id}</Td>
              <Td>{product.name}</Td>
              <Td>{product.description}</Td>
             {/*  <Td>
                <DetailLink href={product.link}>Ver detalle</DetailLink>
              </Td> */}
            </Tr>
          ))
        }
      </tbody>
    </Table>
  </TableContainer>
  )
}

export default ProductsList