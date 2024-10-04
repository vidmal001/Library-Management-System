import React, { useState } from "react";
import "./BookForm.scss";
import httpRequest from "../../utils/httpRequest";
import { Toaster, toast } from "react-hot-toast";

const UpdateBookForm = () => {
  const [deleteTitle, setdeleteTitle] = useState("");
  const [searchTitle, setsearchTitle] = useState("");
  const [bookData, setBookData] = useState({
    booktitle: "",
    bookdesc: "",
    category: "",
    image: "",
    inStock: "",
    author:"",
  });

  const resetForm = () => {
    setBookData({
      booktitle: "",
      bookdesc: "",
      category: "",
      image: "",
      inStock: "",
      author:"",
    });
    setsearchTitle('');
  };

  const handleSearch = async () => {
    try {
      const res = await httpRequest.get(`/books/${searchTitle}`);
      const resData = res.data;
      setBookData(resData);
    } catch (err) {
      toast.error("an error occured while searching please try again later !");
    }
  };

  const handleChange = async (e) => {
    setBookData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await httpRequest.put(`/books/${searchTitle}`, bookData);
      resetForm();
      toast.success("Book data updated successfully");
    } catch (err) {
      toast.error("Error occurred while updating Book");
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await httpRequest.delete(`/books/${deleteTitle}`);
      toast.success(`Book deleted successfully`);
      setdeleteTitle("");
    } catch (err) {
      toast.error(`An Error occur while deleting please try again later`);
      console.error(err);
    }
  };

  return (
    <div className="createform">
      <Toaster />
      <div className="container">
        <h1>Update Books</h1>
        <div>
          <label htmlFor="search" className="updatelabel">
            Search an book Here
          </label>
          <input
            type="text"
            name="search"
            placeholder="e.g. search your book title here"
            className="updateinput"
            value={searchTitle}
            onChange={(e) => setsearchTitle(e.target.value)}
          />
          <button className="commonButton" onClick={handleSearch}>
            Search Book
          </button>
        </div>
        <hr className="seperator" />
        <div className="whole">
          <div className="left">
            <label htmlFor="booktitle">Add Book Name Here</label>
            <input
              type="text"
              name="booktitle"
              placeholder="e.g. Harry Potter"
              value={bookData.booktitle}
              onChange={handleChange}
            />
            <label htmlFor="category">Enter Book Category Here</label>
            <input
              type="text"
              name="category"
              placeholder="e.g. Mystery"
              value={bookData.category}
              onChange={handleChange}
            />
            <label htmlFor="image">Enter Book image link here</label>
            <input
              type="text"
              name="image"
              placeholder="enter an image link here"
              value={bookData.image}
              onChange={handleChange}
            />
            <label htmlFor="author">Enter Book author here</label>
            <input
              type="text"
              name="author"
              placeholder="author"
              value={bookData.author}
              onChange={handleChange}
            />
          </div>
          <div className="right">
            <label htmlFor="bookdesc">Enter Book Description Here</label>
            <textarea
              name="bookdesc"
              placeholder="Enter an description of Book"
              cols="26"
              rows="10"
              value={bookData.bookdesc}
              onChange={handleChange}
              data-testid="bookdesc"
            ></textarea>
            <label htmlFor="inStock">Enter Stock count Here</label>
            <input
              type="text"
              name="inStock"
              placeholder="e.g. 15"
              value={bookData.inStock}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="createbutton" onClick={handleUpdate}>
          Update Book
        </button>
        <div>
          <h1>Delete Book</h1>
          <hr className="seperator" />
          <label htmlFor="" className="updatelabel">
            Enter a book Here
          </label>
          <input
            type="text"
            placeholder="e.g. Your title should be unique"
            className="updateinput"
            value={deleteTitle}
            onChange={(e) => setdeleteTitle(e.target.value)}
          />
          <button className="commonButton" onClick={handleDelete}>
            Delete Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBookForm;
