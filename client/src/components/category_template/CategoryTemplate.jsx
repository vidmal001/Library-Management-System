import React from 'react';
import './CategoryTempelate.scss';
import { Link } from 'react-router-dom';

const CategoryTemplate = ({ card }) => {
  return (
    <Link to={`/books?category=${card.title}`}>
      <div className="catCard">
        <img src={card.image} alt="" />
        <span className="desc">{card.description}</span>
        <span className="title">{card.title}</span>
      </div>
    </Link>
  );
};

export default CategoryTemplate;






