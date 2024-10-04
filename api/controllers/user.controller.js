import User from "../models/user.js";
import showError from "../utils/errors.js";

export const deleteUser = async (req, res , next) => {
  if (!req.isAdmin)
  return next(showError(403, "Only Admins can delete a user"));

  const user = await User.findById(req.params.id);
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted.");
};

export const getUser = async (req, res , next) => {
  const user = await User.findById(req.params.id);
  res.status(200).send(user);
};

export const getUserCount = async (req, res,next) => {
  try {
    const count = await User.find().count().exec();
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isAdmin: false });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
};


export const updateMyDetails = async (req, res, next) => {
  try {
   
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: req.body.email || '',
          description: req.body.description || '',
          phone: req.body.phone || '',
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};