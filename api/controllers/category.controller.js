import showError from "../utils/errors.js";
import Category from "../models/category.model.js";

export const createCategory = async (req, res, next) => {
  if (!req.isAdmin)
    return next(showError(403, "Only Admins can create a category"));

  // Check if the title is provided in the request body
  if (!req.body.title) {
    return next(showError(400, "Title is required"));
  }
  const newCategory = new Category({
    title: req.body.title.toLowerCase(),
    image: req.body.image,
    description: req.body.description,
  });

  try {
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    // Check if the error is a duplicate key error (11000 is the MongoDB error code for duplicate key)
    if (err.code === 11000) {
      return next(
        showError(400, "Category with the same title already exists")
      );
    }
    next(err);
  }
};

export const deleteCategory = async (req, res, next) => {
  if (!req.isAdmin) {
    return next(showError(403, "Only Admins can delete a category"));
  }
  try {
    const deletedCategory = await Category.findOneAndDelete({
      title: new RegExp("^" + req.params.title + "$", "i"),
    });
    if (!deletedCategory) {
      return next(showError(404, "Category not found"));
    }
    res.status(200).json({ message: "Category has been deleted" });
  } catch (err) {
    next(err);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (err) {
    next(err);
  }
};

export const getCategorie = async (req, res, next) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return next(showError(404, "Category not found"));
    }
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

export const getCategorieByTitle = async (req, res, next) => {
  try {
    const category = await Category.findOne({
      title: new RegExp("^" + req.params.title + "$", "i"),
    });
    if (!category) {
      return next(showError(404, "Category not found"));
    }
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

export const updateCategorie = async (req, res, next) => {
  try {
    if (!req.body.title) {
      return next(showError(400, "Title cannot be empty"));
    }
    const updatedCategory = await Category.findOneAndUpdate(
      { title: new RegExp("^" + req.params.title + "$", "i") }, //start and end of the string with case senstive
      {
        $set: {
          title: req.body.title || "",
          image: req.body.image || "",
          description: req.body.description || "",
        },
      },
      { new: true }
    );

    // If the category doesn't exist, return an error
    if (!updatedCategory) {
      return next(showError(404, "Category not found"));
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    // Handle errors
    next(err);
  }
};

export const getCategoryCount = async (req, res,next) => {
  try {
    const count = await Category.find().count().exec();
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    next(err);
  }
};