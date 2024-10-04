import mongoose from "mongoose";
const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    booktitle: {
      type: String,
      required: true,
      unique:true,
    },
    bookdesc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    starNumber: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Number,
      default: 1,
    },
    author: {
      type: String,
      required:false,
    },
    reads:{
      type:Number,
      default:0,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", BookSchema);
