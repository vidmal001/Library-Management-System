import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    book_title: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    is_Approved: {
      type: Boolean,
      default: false,
    },
    is_Completed: {
      type: Boolean,
      default: false,
    },
    admin_name: {
      type: String,
      required: false,
    },
    adminId: {
      type: String,
      required: false,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);
