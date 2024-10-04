import React from "react";
import "./Message.css";


const Message = ({message,mine}) => {
 

  return (
    <div className={mine ? "message mine" :"message"}>
      <div className="messageTop">
        <img className="messageImg" src="/user.png" alt="" />
      </div>
      <p className="messageContentText">{message.text}</p>
    
    </div>
  );
};

export default Message;
