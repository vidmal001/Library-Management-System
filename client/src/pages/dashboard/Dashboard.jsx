import React, { useState, useEffect } from "react";
import "./Dashboard.scss";
import BookForm from "../../components/bookForm/BookForm";
import UpdateBookForm from "../../components/bookForm/UpdateBookForm";
import CategoryForm from "../../components/categoryForm/CategoryForm";
import UpdateCategoryForm from "../../components/categoryForm/UpdateCategoryForm";
import httpRequest from "../../utils/httpRequest";
import Users from "../../components/users/Users";
import Overdue from "../../components/overdue_orders/Overdue";
import { Toaster, toast } from "react-hot-toast";

const Dashboard = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalCat, setTotalCat] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  useEffect(() => {
    const fetchBookCount = async () => {
      try {
        const res = await httpRequest.get("/books/all/count");
        const count = res.data.count;
        setTotalBooks(count);
      } catch (err) {
        toast.error("Error occurred while updating user details");
      }
    };

    fetchBookCount();
  }, []);

  useEffect(() => {
    const fetchCatCount = async () => {
      try {
        const res = await httpRequest.get("/categories/all/count");
        const count = res.data.count;
        setTotalCat(count);
      } catch (err) {
        toast.error("Error occurred while updating user details");
      }
    };

    fetchCatCount();
  }, []);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await httpRequest.get("/users/all/count");
        const count = res.data.count;
        setTotalUsers(count);
      } catch (err) {
        toast.error("Error occurred while updating user details");
      }
    };

    fetchUserCount();
  }, []);

  return (
    <>
      <div className="dashboard-root">
      <Toaster />
        <div
          className="dashboard-card"
          onClick={() => handleCardClick("books")}
        >
          <img src="/books-stack-of-three.png" alt="Book Icon" />
          <h2>Books</h2>
          <p>Total books: {totalBooks}</p>
        </div>
        <div
          className="dashboard-card"
          onClick={() => handleCardClick("categories")}
        >
          <img src="/categories.png" alt="Category Icon" />
          <h2>Categories</h2>
          <p>Total categories: {totalCat}</p>
        </div>
        <div
          className="dashboard-card"
          onClick={() => handleCardClick("users")}
        >
          <img src="/user (1).png" alt="User Icon" />
          <h2>Users</h2>
          <p>Total users: {totalUsers} </p>
        </div>
        <div className="dashboard-card" onClick={() => handleCardClick("overdue")}>
          <img src="/clipboard.png" alt="User Icon" />
          <h2>Uncomplete Orders</h2>
        </div>
      </div>
      {selectedCard === "books" && (
        <>
          <BookForm />
          <UpdateBookForm />
        </>
      )}

      {selectedCard === "categories" && (
        <>
          <CategoryForm />
          <UpdateCategoryForm />
        </>
      )}

      {selectedCard === "users" && (
        <>
          <Users />
        </>
      )}

      {selectedCard === "overdue" && (
        <>
          <Overdue />
        </>
      )}
    </>
  );
};

export default Dashboard;
