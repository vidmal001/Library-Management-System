import React, { useState } from "react";
import "../bookForm/BookForm.scss";
import httpRequest from "../../utils/httpRequest";
import { Toaster, toast } from "react-hot-toast";

const UpdateCategoryForm = () => {
  const [deleteTitle, setDeleteTitle] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [categoryData, setCategoryData] = useState({
    title: "",
    image: "",
    description: "",
  });

  const resetForm = () => {
    setCategoryData({
      title: "",
      image: "",
      description: "",
    });
    setSearchTitle("");
  };

  const handleSearch = async () => {
    try {
      const response = await httpRequest.get(`/categories/${searchTitle}`);
      const resData = response.data;
      setCategoryData(resData);
    } catch (err) {
      toast.error("an invalid title please enter the correct title");
    }
  };

  const handleChange = async (e) => {
    setCategoryData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await httpRequest.put(`/categories/${searchTitle}`, categoryData);
      toast.success("category updated successfully");
      resetForm();
    } catch (err) {
      toast.error("Error occured while updating!!");
    }
  };

  const handleDelete = async () => {
    try {
      await httpRequest.delete(`/categories/${deleteTitle}`);
      toast.success(`category deleted successfully`);
      setDeleteTitle("");
    } catch (err) {
      toast.error(`An Error occur while deleting please try again later`);
    }
  };
  return (
    <div className="createform">
      <Toaster />
      <div className="container">
        <h1>Update Category</h1>
        <div>
          <label htmlFor="" className="updatelabel">
            Search an category Here
          </label>
          <input
            type="text"
            placeholder="Add Category Name Here"
            className="updateinput"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <button className="commonButton" onClick={handleSearch}>
            Search Category
          </button>
        </div>
        <hr className="seperator" />
        <div className="whole">
          <div className="left">
            <label htmlFor="title">Add Category title Here</label>
            <input
              type="text"
              name="title"
              placeholder="Add Category title Here"
              value={categoryData.title}
              onChange={handleChange}
            />
            <label htmlFor="image">Enter category image link here</label>
            <input
              type="text"
              name="image"
              placeholder="Enter Category image link here"
              value={categoryData.image}
              onChange={handleChange}
            />
          </div>
          <div className="right">
            <label htmlFor="description">Enter Category Description Here</label>
            <textarea
              name="description"
              id=""
              placeholder="Enter an description of Category"
              cols="26"
              rows="10"
              value={categoryData.description}
              onChange={handleChange}
              data-testid="description"
            ></textarea>
          </div>
        </div>
        <button className="createbutton" onClick={handleUpdate}>
          Update category
        </button>
        <div>
          <h1>Delete category</h1>
          <hr className="seperator" />
          <label htmlFor="" className="updatelabel">
            Enter an title Here
          </label>
          <input
            type="text"
            placeholder="e.g. Your title should be unique"
            className="updateinput"
            value={deleteTitle}
            onChange={(e) => setDeleteTitle(e.target.value)}
          />
          <button className="commonButton" onClick={handleDelete}>
            Delete Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategoryForm;
