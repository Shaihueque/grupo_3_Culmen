import React from "react";
import { useState, useEffect } from "react";

const DetailLastProduct = ({ products }) => {

  const [lastProductDetail, setLastProductDetail] = useState({
    product: {
      name: "",
      description: "",
      brand: "",
      category: "",
      type: "",
      price: "",
    },
  });

  let lastProduct = products.products ? products.products[products.products.length - 1] : null;

  useEffect(() => {
    (async () => {
        let detailResponse;
        if (lastProduct && lastProduct.link) {
            detailResponse = await fetch(lastProduct.link).then((res) => res.json());
        }
        //setLastProductDetail(detailResponse);
        detailResponse && detailResponse.product && setLastProductDetail(detailResponse);

        })();
    }, [lastProduct]);

  //console.log(lastProductDetail.product);

  return (
    <div>
        {
            lastProductDetail.product &&
        (    <>
            <h2>Último producto agregado !! </h2>
            <h3>Nombre: {lastProductDetail.product.name}</h3>
            <p>Descripcion {lastProductDetail.product.description}</p>
            <p>Marca: {lastProductDetail.product.brand}</p>
            <p>Categoria: {lastProductDetail.product.category}</p>
            <p>Tipo: {lastProductDetail.product.type}</p>
            <p>Precio: {lastProductDetail.product.price}</p>
            <img src={lastProductDetail.product.image} alt="imagen del ultimo producto" style={{width:'200px'}} />
            </>)
        }

    </div>
    )
};




export default DetailLastProduct;
