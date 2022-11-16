import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getProducts } from "../functions/products";
const ProductDetail = () => {
  const [products, setProduct] = useState();
  const { slug } = useParams();

  useEffect(() => {
    const getProudct = async () => {
      const { data } = await getProducts(slug);
      setProduct(data);
    };
    getProudct();
  }, []);
  return (
    <div>
      <h1>detail page</h1>
      {JSON.stringify(products)}
    </div>
  );
};

export default ProductDetail;
