import React, { useState, useEffect } from "react";
import "./MyProfile.scss";
import httpRequest from "../../utils/httpRequest";
import { Toaster, toast } from "react-hot-toast";


const MyProfile = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser._id;

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    description: "",
    phone: "",
    isAdmin: false,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await httpRequest.get(`/users/${userId}`);
        const userData = res.data;
        setUserData(userData);
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      // Update only email, description, and phone
      const { email, description, phone } = userData;
      await httpRequest.put(`/users/${userId}`, { email, description, phone });
      window.location.reload();
      toast.success(`User updated successfully`);
    } catch (err) {
      console.error("Error occurred while updating user data", err);
    }
  };

  return (
    <div className="profile">
      <Toaster/>
      <div className="profile-image">
        <img src="./user.png" alt="Profile" />
      </div>
      <div className="profile-details">
        <div className="row">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={userData.username} readOnly />
        </div>
        <div className="row">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={userData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="row">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={userData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <label htmlFor="isAdmin">Is Admin</label>
          <input
            type="text"
            id="isAdmin"
            value={userData.isAdmin ? "Yes" : "No"}
            readOnly
          />
        </div>
        <div className="row">
        <button onClick={handleUpdate}>Update</button>
        </div>
        
      </div>
    </div>
  );
};

export default MyProfile;