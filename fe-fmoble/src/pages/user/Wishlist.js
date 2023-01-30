import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getWishlist, removeWishlist } from "../../functions/user";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState();
  const { user } = useSelector((state) => ({ ...state }));
  const [token, setToken] = useState();
  const getToken = user.token;

  useEffect(() => {
    loadWishlist(token);
  }, [token]);

  useEffect(() => {
    const getToken = async () => {
      const value = localStorage.getItem("token");
      if (value) {
        setToken(value);
      }
    };
    getToken();
  }, []);

  const loadWishlist = async (key) => {
    const res = await getWishlist(key);
    console.log(res);
    if (
      res &&
      res.data &&
      res.data[0].wishlist &&
      res.data[0].wishlist.length > 0
    ) {
      console.log(res.data[0].wishlist);

      setWishlist(res.data[0].wishlist);
    }
  };

  console.log("___WithList___", wishlist);

  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });

  return (
    <div>
      <h3 className="center">
        {wishlist?.map((p) => (
          <div key={p._id} className="alert alert-secondary">
            <Link to={`/product/${p.slug}`}>{p.title}</Link>
            <span
              onClick={() => handleRemove(p._id)}
              className="btn btn-sm float-right"
            ></span>
          </div>
        ))}
        {/* {JSON.stringify(wishlist.data.title)} */}
      </h3>
    </div>
  );
};

export default Wishlist;
