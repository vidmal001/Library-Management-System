import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js"
import authRoute from "./routes/authRoute.js"
import bookRoute from "./routes/bookRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import orderRoute from "./routes/orderRoute.js"
import cookieParser from "cookie-parser";
import conversationRoute from "./routes/conversation.js"
import messageRoute from "./routes/messages.js"
import cors from "cors";

const app = express();
dotenv.config();

// mongo db connection function

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(" successfully connected to mongoDB");
  } catch (error) {
    console.log(error);
  }
};

//allow our application to take input from user
app.use(express.json());
//to use cookies in our client side 
app.use(cookieParser());
//for passing cookies client to backend side

app.use(cors({ origin: "http://localhost:3000", credentials: true }));



app.use("/api/auth",authRoute);
app.use("/api/users", userRoute);
app.use("/api/books", bookRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/orders",orderRoute);
app.use("/api/conversations",conversationRoute)
app.use("/api/messages",messageRoute)


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8800, () => {
  connectMongoDB();
  console.log("server is runnning on port 8800");
});
