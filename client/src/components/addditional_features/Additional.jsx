import React from "react";
import "./Additional.scss";
const Additional = () => {
  return (
    <div className="cate"> 
      <div className="cate_container">
        <h1>Discover our library sections now</h1>
        <div className="items">
          <div className="catitem">
            <img src="./detective.png" alt="" />
            <div className="line"></div>
            <span>Mystey</span>
          </div>
          <div className="catitem">
            <img src="./data-science.png" alt="" />
            <div className="line"></div>
            <span>Science</span>
          </div>
          <div className="catitem">
            <img src="./code.png" alt="" />
            <div className="line"></div>
            <span>Programming</span>
          </div>
          <div className="catitem">
            <img src="./history.png" alt="" />
            <div className="line"></div>
            <span>History</span>
          </div>
          <div className="catitem">
            <img src="./religion.png" alt="" />
            <div className="line"></div>
            <span>Religion</span>
          </div>
          <div className="catitem">
            <img src="./languages.png" alt="" />
            <div className="line"></div>
            <span>Translates</span>
          </div>
          <div className="catitem">
            <img src="./flag.png" alt="" />
            <div className="line"></div>
            <span>War</span>
          </div>
          <div className="catitem">
            <img src="./children.png" alt="" />
            <div className="line"></div>
            <span>children</span>
          </div>
          <div className="catitem">
            <img src="./thinking.png" alt="" />
            <div className="line"></div>
            <span>psychology</span>
          </div>
          <div className="catitem">
            <img src="./literature.png" alt="" />
            <div className="line"></div>
            <span>Arts and Literature</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Additional;
