import React, { useState, useEffect } from "react";
//import lib
import StarRating from "react-star-ratings";

import { useParams } from "react-router-dom";
import { getProduct } from "../functions/products";
import RatingModal from "../component/modals/RatingModals";
const ProductDetail = ({ product }) => {
  const [products, setProduct] = useState();
  const { slug } = useParams();

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
      {JSON.stringify(products)}
      <RatingModal>
        <StarRating
          name={slug}
          numberOfStars={5}
          rating={2}
          changeRating={(newRating, name) =>
            console.log("New Rating", newRating, "name", name)
          }
          isSelectable={true}
        />
      </RatingModal>
    </div>
  );
};

export default ProductDetail;
