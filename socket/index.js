const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
  
  io.on("connection", (socket) => {
    //if a new user connect to the same url we will console log the message saying user connected also we add the new user to the users array
    console.log("a user connected");
  
    //take userId and socketId from user (Take something from client we are using on)
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });
  
    //if a user disconnect from the url or chat we will show console saying user disconnected also we will remove the user from the users array.
    socket.on("disconnect", () => {
      console.log("A user disconnected");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
  