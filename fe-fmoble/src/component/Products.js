import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { NavLink } from "react-router-dom";

const Products = ({ product }) => {
  return (
    <Card className="my-3 p-2 rounded">
      <NavLink to={`/product/${product._id}`}>
        <Card.Img className="img-fluid" src={product.image} variant="top" />
      </NavLink>

      <Card.Body>
        <NavLink to={`/product/${product._id}`}>
          <Card.Title>
            <strong>{product.name}</strong>
          </Card.Title>
        </NavLink>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Products;
