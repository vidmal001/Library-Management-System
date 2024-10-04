import React, { useState, useEffect } from "react";
import "./Conversations.css";
import httpRequest from "../../utils/httpRequest";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await httpRequest.get("users/" + userId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      {user ? (
        <>
          <img src="/user.png" alt="" className="conversationImg" />
          <span className="conversationUserName">{user.username}</span>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default Conversation;
