import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Explore</h2>
            <span>Search for Services</span>
            <span>Popular Categories</span>
            <span>Featured Listings</span>
            <span>Deals & Discounts</span>
          </div>
          <div className="item">
            <h2>About Us</h2>
            <span>Our Mission</span>
            <span>How It Works</span>
            <span>Privacy Policy</span>
            <span>Terms and Conditions</span>
            <span>Contact Us</span>
          </div>
          <div className="item">
            <h2>Support</h2>
            <span>FAQ</span>
            <span>Contact Support</span>
            <span>Report an Issue</span>
          </div>
          <div className="item">
            <h2>Community</h2>
            <span>User Reviews</span>
            <span>Community Forum</span>
            <span>Events</span>
            <span>Blog</span>
          </div>
          <div className="item">
            <h2>Connect</h2>
            <span>Follow Us</span>
            <span>Newsletter</span>
            <span>Partnerships</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>Sarasavi Books</h2>
            <span>All rights reserved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
