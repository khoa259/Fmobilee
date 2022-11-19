import React, { useEffect, useState } from "react";
import { getCategory } from "../../functions/category";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const CategoryHome = () => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((c) => {
      console.log(JSON.stringify(c.data));
      setCategory(c.data);
    });
  }, []);
  return <div>{slug}</div>;
};

export default CategoryHome;
