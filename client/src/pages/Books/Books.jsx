import React from "react";
import "./Books.scss";
import BookTempelate from "../../components/book_template/BookTempelate";
import { useQuery } from "@tanstack/react-query";
import httpRequest from "../../utils/httpRequest";
import { useLocation } from "react-router-dom";

const Books = () => {
  const { search } = useLocation();

  const { isLoading, error, data } = useQuery({
    queryKey: ["books"],
    queryFn: () =>
      httpRequest.get(`/books${search}`).then((res) => {
        return res.data;
      }),
  });

  const getCategoryFromQueryString = () => {
    const params = new URLSearchParams(search);
    return params.get("category");
  };

  const title = getCategoryFromQueryString();
    
  return (
    <div className="AllBooks">
      <div className="container">
        <span>Relevant Books for Each Category </span>
        <h1>{title}</h1>
        <div className="cards">
          {isLoading
            ? "loading the Books...."
            : error
            ? "You have to logged in to see the Books "
            : data.map((book) => <BookTempelate key={book._id} item={book} />)}
        </div>
      </div>
    </div>
  );
};

export default Books;
