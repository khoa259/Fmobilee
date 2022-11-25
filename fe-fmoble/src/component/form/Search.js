import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history(`/products?${text}`);
  };

  return (
    <div className="search-box">
      <button className="btn-search" onClick={handleSubmit}>
        <i className="fas fa-search" />
      </button>
      <input
        type="text"
        className="input-search"
        placeholder="Type to Search..."
        value={text}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
