import Order from "../models/order.model.js";
import Book from "../models/book.model.js";
import showError from "../utils/errors.js";
import User from "../models/user.js";

export const createOrder = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return next(showError(404, "user not found"));
  }

  const { bookId } = req.body;

  const book = await Book.findById(bookId);
  if (!book) {
    return next(showError(404, "Book not found"));
  }
  const normal_user = user.username;

  const newOrder = new Order({
    user_name: normal_user,
    book_title: book.booktitle,
    userId: req.userId,
    ...req.body,
  });
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    next(err);
  }
};

export const getUnapprovedOrders = async (req, res, next) => {
  try {
    const unapprovedOrders = await Order.find({ is_Approved: false });
    res.status(200).send(unapprovedOrders);
  } catch (err) {
    next(err);
  }
};

export const approveOrder = async (req, res, next) => {
  if (!req.isAdmin)
    return next(showError(403, "Only Admins can approve order"));

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(showError(404, "Order not found"));
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return next(showError(404, "Admin user not found"));
    }

    const admin_username = user.username;

    order.is_Approved = true;
    order.admin_name = admin_username;
    order.adminId = req.userId;
    await order.save();

    // Find the corresponding book and update its inStock field
    const book = await Book.findOne({ booktitle: order.book_title });
    if (book && book.inStock > 0) {
      book.inStock -= 1;
      book.reads += 1;
      await book.save();
    } else {
      // If there is no book found or is out of stock, error is gonna show
      return next(showError(400, "Book not available in stock"));
    }

    res.status(200).json({ message: "Order approved successfully" });
  } catch (err) {
    next(err);
  }
};

export const getApprovedOrders = async (req, res, next) => {
  const usernameField = req.isAdmin ? "admin_name" : "user_name";
  const { title } = req.params;
  try {
    const approvedOrders = await Order.find({
      is_Approved: true,
      [usernameField]: title,
      is_Completed: false,
    });
    res.status(200).send(approvedOrders);
  } catch (err) {
    next(err);
  }
};

export const getNotCompletedOrders = async (req, res, next) => {
  if (!req.isAdmin) return next(showError(403, "You are not a Admin"));
  try {
    const orders = await Order.find({
      is_Approved: true,
      is_Completed: false,
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  if (!req.isAdmin)
    return next(showError(403, "Only Admins can delete a Order"));
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send("Order has been deleted");
  } catch (err) {
    next(err);
  }
};

export const CompletedOrder = async (req, res, next) => {
  if (!req.isAdmin)
    return next(showError(403, "Only Admins can complete order"));

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(showError(404, "Order not found"));
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return next(showError(404, "Admin user not found"));
    }

    order.is_Completed = true;
    await order.save();

    const book = await Book.findOne({ booktitle: order.book_title });
    if (book && book.inStock > 0) {
      book.inStock += 1;

      await book.save();
    } else {
      return next(showError(400, "there is an error occured"));
    }

    res.status(200).json({ message: "Order completed successfully" });
  } catch (err) {
    next(err);
  }
};
