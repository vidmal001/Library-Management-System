import React, { useState } from "react";
import "./Register.scss";
import httpRequest from "../../utils/httpRequest";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
    description: "",
    phone:"",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleAdmin = (e) => {
    setUser((prev) => {
      return { ...prev, isAdmin: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await httpRequest.post("/auth/register", {
        ...user,
      });
      toast.success("you have successfully registered to the system !!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/");
    } catch (err) {
      console.log(err);
      const errMessage = err.response.data;
      if (errMessage.includes("username_1"))
        toast.error("Username already exists. Please choose a different one.");
      else if (errMessage.includes("email_1"))
        toast.error("Email already exists. Please use a different email.");
      else
        toast.error("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="signup">
      <Toaster />
      <form onSubmit={handleSubmit} autoComplete="true" className="signupform">
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="username">Username</label>
          <input
            autoComplete="true"
            id="username"
            name="username"
            type="text"
            placeholder="enter your username here"
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            autoComplete="true"
            id="email"
            name="email"
            type="email"
            placeholder="enter your email here"
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="enter your password here"
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </div>

        <div className="right">
          <h1>Create librarian account</h1>
          <div className="lib-text">
            If you want to create a new account as a librarian, please activate
            the toggle below. Make sure to enter a valid email and password
            provided by the organization
          </div>
          <div className="toggle">
           <div>
            Activate the librarian account
           </div>
            <label htmlFor="checkbox" className="switch">
              <input title="checkbox" placeholder="checkbox" id="checkbox" type="checkbox" onChange={handleAdmin} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="phone">Phone Number</label>
          <input
            autoComplete="true"
            id="phone"
            name="phone"
            type="text"
            placeholder="enter your phone number here"
            onChange={handleChange}
          />
          <label htmlFor="description">Description</label>
          <textarea
            autoComplete="true"
            name="description"
            id="description"
            placeholder="enter an description about yourself ! why you want to become an librarian?"
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
