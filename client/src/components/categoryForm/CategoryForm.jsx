import React, { useState } from "react";
import "../bookForm/BookForm.scss";
import httpRequest from "../../utils/httpRequest";
import { Toaster, toast } from "react-hot-toast";

const CategoryForm = () => {
  const [createCategory, setCategory] = useState({
    title: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setCategory((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await httpRequest.post("/categories", {
        ...createCategory,
      });
      toast.success("Category data added successfully");
    } catch (err) {
      toast.error("there is an error occured please try again later !");
      console.log(err);
    }
  };

  return (
    <div className="createform">
      <Toaster/>
      <div className="container">
        <h1>Add New Category</h1>
        <hr className="seperator" />
        <div className="whole">
          <div className="left">
            <label htmlFor="title">Add Category Name Here</label>
            <input
              name="title"
              type="text"
              placeholder="e.g. Mystery"
              onChange={handleChange}
            />
            <label htmlFor="image">Enter Category image link here</label>
            <input type="text" name="image" placeholder="Enter Category image link here" onChange={handleChange} />
          </div>
          <div className="right">
            <label htmlFor="description">Enter Category Description Here</label>
            <textarea
              name="description"
              id=""
              placeholder="Enter an description of Category"
              cols="26"
              rows="10"
              onChange={handleChange}
              data-testid="description"
            ></textarea>
          </div>
        </div>
        <button className="createbutton" onClick={handleSubmit}>
          Create Category
        </button>
      </div>
    </div>
  );
};

export default CategoryForm;
