import React from "react";
import { useState, useEffect } from "react";
import {LastProductWrapper} from './DetailLastStyles'

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
    <LastProductWrapper>
      {lastProductDetail.product && (
        <>
          <h2>Último producto agregado 👇🏼!! </h2>
          <h3>Nombre: <span>{lastProductDetail.product.name.toUpperCase()}</span> </h3>
          <p>Descripcion <span>{lastProductDetail.product.description.toUpperCase()}</span> </p>
          <p>Marca: <span>{lastProductDetail.product.brand.toUpperCase()}</span> </p>
          <p>Categoria:<span> {lastProductDetail.product.category.toUpperCase()}</span> </p>
          <p>Tipo: <span>{lastProductDetail.product.type.toUpperCase()}</span> </p>
          <p>Precio: <span>{lastProductDetail.product.price}</span> </p>
          <img
            src={lastProductDetail.product.image}
            alt="imagen del ultimo producto"
            style={{ width: "200px" }}
          />
        </>
      )}
    </LastProductWrapper>
  );
};

export default DetailLastProduct;
