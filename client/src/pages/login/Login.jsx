import React, { useState } from "react";
import "./Login.scss";
import httpRequest from "../../utils/httpRequest";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

function Login() {
  //useState for setname 
  const [username, setUsername] = useState("");
  //useState for set password
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await httpRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      //res.data is an object so we need to convert that object into a string inorder to store it inside the localstorage
      navigate("/");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  

  return (
    <div className="Signin">
      <h2> Sign in</h2>
      <Toaster />
      <form onSubmit={handleSubmit} autoComplete="true" className="signin-form">
        <label htmlFor="username">username</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="enter your username here"
          autoComplete="true"
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="true"
          placeholder="enter your password here"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>

        <p className="forgotpassword">
          <Link>Forgot your password ?</Link>
        </p>
      </form>
      <div className="line-container">
        <hr className="line" />
        <div className="line-text">or</div>
        <hr className="line" />
      </div>
      <p className="no-account">
        Don't have an account?
        <Link to="/register">SignUp</Link>
      </p>
    </div>
  );
}

export default Login;