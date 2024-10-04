import React, { useState } from "react";
import "./Topsection.scss";
import httpRequest from "../../utils/httpRequest";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

function Topsection() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!searchInput.trim()) {
      toast.error("Please enter a valid title for the book.");
      return;
    }
    try {
      const response = await httpRequest.get(`books/${searchInput}`);
      const book = response.data;
      if (book) {
        navigate(`/book/${book._id}`);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("You are not authenticated! Please log in first.");
      } else {
        console.error(err);
        toast.error(
          "Sorry, we were unable to find a book with that particular title in our database."
        );
      }
    }
  };

  return (
    <div className="featured">
      <Toaster />
      <div className="container">
        <div className="left">
          <h1>
            Explore Our Vast Collection of Books for Your Reading Pleasure
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./search-interface-symbol.png" alt="" />
              <input
                type="text"
                placeholder="Try :  Harry potter"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <button type="button" onClick={handleSubmit}>
              Search
            </button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Harry Potter</button>
            <button>Sherlock</button>
            <button>To Kill a Mockingbird</button>
            <button>The Great Gatsby</button>
            <button>1984</button>
            <button>The Lord of the Rings</button>
            <button>The Hunger Games</button>
            <button>The Catcher in the Rye</button>
            <button>Pride and Prejudice</button>
            <button>The Da Vinci Code</button>
            <button>The Hobbit</button>
            <button>Twilight</button>
            <button>The Chronicles of Narnia</button>
            <button>The Girl with the Dragon Tattoo</button>
            <button>The Fault in Our Stars</button>
            <button>Game of Thrones</button>
            <button>The Shining</button>
            <button>Brave New World</button>
            <button>Frankenstein</button>
            <button>A Song of Ice and Fire</button>
          </div>
        </div>
        <div className="right">
          <img src="./book (2).png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Topsection;
