import React, { useState, useEffect } from "react";
//import lib
import StarRating from "react-star-ratings";

import { useParams } from "react-router-dom";
import { getProduct } from "../functions/products";
const ProductDetail = ({ product }) => {
  const [products, setProduct] = useState();
  const { slug, id } = useParams();

  useEffect(() => {
    const getProudct = async () => {
      const { data } = await getProduct(slug);
      setProduct(data);
    };
    getProudct();
  }, []);
  return (
    <div>
      <h1>detail page</h1>

      <StarRating
        name={slug}
        numberOfStars={5}
        rating={2}
        changeRating={(newRating, name) =>
          console.log("New Rating", newRating, "name", name)
        }
        isSelectable={true}
      />
    </div>
  );
};

export default ProductDetail;
