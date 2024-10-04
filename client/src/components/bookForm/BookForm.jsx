import React, { useState } from "react";
import "./BookForm.scss";
import httpRequest from "../../utils/httpRequest";
import { Toaster, toast } from "react-hot-toast";

const BookForm = () => {
  const [createBook, setBook] = useState({
    booktitle: "",
    bookdesc: "",
    category: "",
    image: "",
    inStock: "",
    author: "",
  });

  const handleChange = (e) => {
    setBook((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await httpRequest.post("/books", {
        ...createBook,
      });
      toast.success("Book data added successfully");
    } catch (err) {
      toast.error("there is an error occured please try again later !");
      console.log(err);
    }
  };

  return (
    <div className="createform">
      <Toaster />
      <div className="container">
        <h1>Add New Book</h1>
        <hr className="seperator" />
        <div className="whole">
          <div className="left">
            <label htmlFor="booktitle">Add Book Name Here</label>
            <input
              type="text"
              placeholder="e.g. Harry Potter"
              name="booktitle"
              onChange={handleChange}
            />
            <label htmlFor="category">Enter Book Category Here</label>
            <input
              type="text"
              placeholder="e.g. Mystery"
              name="category"
              onChange={handleChange}
            />
            <label htmlFor="image">Enter Book image link here</label>
            <input
              type="text"
              placeholder="enter an image link here"
              name="image"
              onChange={handleChange}
            />
            <label htmlFor="author">Enter Book author here</label>
            <input
              type="text"
              placeholder="author"
              name="author"
              onChange={handleChange}
            />
          </div>
          <div className="right">
            <label htmlFor="bookdesc">Enter Book Description Here</label>
            <textarea
              name="bookdesc"
              id=""
              placeholder="Enter an description of Book"
              cols="26"
              rows="10"
              onChange={handleChange}
              data-testid="bookdesc"
            ></textarea>
            <label htmlFor="inStock">Enter Stock count Here</label>
            <input
              type="text"
              name="inStock"
              placeholder="e.g. 15"
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="createbutton" onClick={handleSubmit}>
          Create Book
        </button>
      </div>
    </div>
  );
};
export default BookForm;
