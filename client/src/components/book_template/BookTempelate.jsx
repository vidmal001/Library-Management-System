import React from "react";
import "./BookTempelate.scss";
import { Link } from "react-router-dom";

const BookTempelate = ({ item }) => {
  return (
    <Link to={`/book/${item._id}`} className="link">
      <div className="oneBookCard">
        <img src={item.image} alt="" />
        <div className="info">
          <div className="user">
            <img src="/heart.png" alt="" />
            <span>{item.booktitle}</span>
          </div>
          <p>A Book by {item.author}</p>
        </div>
        <hr />
        <div className="detail">
          <img src="/shopping-cart.png" alt="" />
          <div className="price">
            <span>In Stock</span>
            <h2>
               {item.inStock}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookTempelate;
