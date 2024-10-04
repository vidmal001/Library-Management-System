import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import httpRequest from "../../utils/httpRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //Convert string to json using json.parse

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await httpRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      window.location.reload();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">Sarasavi</span>
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/">
            Categories
          </Link>   
          <Link className="link" to="/books">
            All Books
          </Link>   

         
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/user.png"} alt="" />
              <span>{currentUser?.username}</span>

              {open && (
                <div className="options">
                  {currentUser.isAdmin ? (
                    <>
                      <Link className="link" to="/dashboard">
                        Dashboard
                      </Link>
                      <Link className="link" to="/orders">
                        Orders
                      </Link>
                    </>
                  ) : (
                    <>
                     
                    </>
                  )}
                  <Link className="link" to="/approvedOrders">
                    Approved Orders
                  </Link>
                  <Link className="link" to="/myprofile">
                    My Profile
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                Sign in
              </Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/books">
              All Books
            </Link>
            <Link className="link menuLink" to="/books">
              Mystery & Thriller
            </Link>
           
              Science & Fiction
          
            <Link className="link menuLink" to="/books">
              Fantasy
            </Link>
            <Link className="link menuLink" to="/books">
              Motivational
            </Link>
            <Link className="link menuLink" to="/books">
              Biography & Memoir
            </Link>
            <Link className="link menuLink" to="/books">
              History
            </Link>
            <Link className="link menuLink" to="/books">
              Romance
            </Link>
            <Link className="link menuLink" to="/books">
              Business & Finance
            </Link>
            <Link className="link menuLink" to="/books">
              Programming
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
