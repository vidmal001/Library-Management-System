import React, { useEffect, useState, useRef } from "react";
import "./Messages.css";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import httpRequest from "../../utils/httpRequest";
import { io } from "socket.io-client";

const Messages = () => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef();
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const scrollRef = useRef();
  
    useEffect(() => {
      socket.current = io("ws://localhost:8900");
      socket.current.on("getMessage", (data) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    }, []);
  
    useEffect(() => {
      arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);
  
    useEffect(() => {
      socket.current.emit("addUser", user._id);
      socket.current.on("getUsers", (users) => {
        console.log(users);
      });
    }, [user]);
  
    useEffect(() => {
      const getConversations = async () => {
        try {
          const res = await httpRequest.get("conversations/" + user._id);
          setConversations(res.data);
        } catch (err) {
          console.log(err);
        }
      };
  
      getConversations();
    }, [user._id]);
  
    useEffect(() => {
      const getMessages = async () => {
        try {
          const res = await httpRequest.get("messages/" + currentChat?._id);
          setMessages(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getMessages();
    }, [currentChat]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const message = {
        sender: user._id,
        text: newMessage,
        conversationId: currentChat._id,
      };
      const receiverId = currentChat.members.find(
        (member) => member !== user._id
      );
      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessage,
      });
      try {
        const res = await httpRequest.post("messages", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    return (
      <div className="chatSection">
        <div className="allChatUsers">
          <div className="allChatUsersWrapper">
            <input placeholder="All Users" className="allChatUsersInput" />
  
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatPart">
          <div className="chatPartWrapper">
            {currentChat ? (
              <>
                <div className="topChatSection">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} mine={m.sender === user._id}/>
                    </div>
                  ))}
                </div>
                <div className="bottomChatSection">
                  <textarea
                    className="sendMessageInput"
                    placeholder="You can send any message here !"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="sendMessageButton" onClick={handleSubmit}>
                    {" "}
                    Send{" "}
                  </button>
                </div>{" "}
              </>
            ) : (
              <span className="noChatOpen">
               You Can Select Any Chat From Left Side !
              </span>
            )}
          </div>
        </div>
      </div>
    );
}

export default Messages