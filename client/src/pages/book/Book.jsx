import React, { useState } from "react";
import "./Book.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import httpRequest from "../../utils/httpRequest";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Book = () => {
  const navigate = useNavigate();
  const [start_date, setstartDate] = useState("");
  const [end_date, setendDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateString = maxDate.toISOString().split("T")[0];

  const { id } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ["book"],
    queryFn: () =>
      httpRequest.get(`/books/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const handleBorrow = async () => {
    try {
      await httpRequest.post("/orders", {
        bookId: id,
        start_date,
        end_date,
      });
      toast.success(
        "Thank you for placing your order! Your order has been received and will be reviewed by our team. You can check your approved orders page for more details.",
        {
          duration: 5000,
          style: {
            width: "50rem",
          },
        }
      );
      setTimeout(() => {
        navigate(`/approvedOrders`);
      }, 3000);

    } catch (err) {
      toast.error(
        "There was an error placing the order. Please try again later!"
      );
      console.error(err);
    }
  };

  return (
    <div className="book-details">
        <Toaster />
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <div className="titlesec">
              <h2 className="title">{data.booktitle}</h2>
              <span> ~ A Book by {data.author} </span>
            </div>
            <img src={data.image} alt="" />
            <h2>About This Book</h2>
            <p>{data.bookdesc}</p>
            <div className="stock">
              <img className="stock-image" src="/shopping-cart.png" alt="" />
              <h2>There are a total of {data.inStock} books are available</h2>
            </div>
          </div>
          <div className="right">
            <p>
              Embark on a journey of exploration and enlightenment as you delve
              into the intricately crafted pages of this remarkable book.
            </p>
            <div className="details">
              <div className="item">
                <img src="/clock.png" alt="" />
                <span>12 Days Delivery</span>
              </div>
              <div className="item">
                <img src="/shopping-cart.png" alt="" />
                <span>{data.inStock}</span>
              </div>
            </div>
            <div className="features">
              <div className="item">
                <img src="/renewable.png" alt="" />
                <span>Renewals Allowed</span>
              </div>
              <div className="item">
                <img src="/writing.png" alt="" />
                <span>Engaging and Well-Written</span>
              </div>
              <div className="item">
                <img src="/enrichment.png" alt="" />
                <span>Enhanced Reading Experience</span>
              </div>
            </div>
            <div className="Datepicker">
              <div>
                <h1>Start Date: {start_date}</h1>
                <input
                  type="date"
                  value={start_date}
                  onChange={(e) => setstartDate(e.target.value)}
                  min={today}
                  max={maxDateString}
                  data-testid="start-date-input"
                  placeholder="start date"
                />
              </div>
              <div>
                <h1>End Date: {end_date}</h1>
                <input
                  type="date"
                  value={end_date}
                  onChange={(e) => setendDate(e.target.value)}
                  min={today}
                  max={maxDateString}
                  data-testid="end-date-input"
                />
              </div>
            </div>

            <button onClick={handleBorrow}>Borrow Now</button>
            <p className="warning">
              !! You must bring back the book after your time period expires.
              Otherwise, you will be charged according to the number of days you
              keep the book.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
