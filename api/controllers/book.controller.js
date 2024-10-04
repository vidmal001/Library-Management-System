import showError from "../utils/errors.js";
import Book from "../models/book.model.js";

export const createBook = async (req, res, next) => {
  if (!req.isAdmin)
    return next(showError(403, "Only Admins can create a book"));

  const newBook = new Book({
    userId: req.userId,
    ...req.body,
  });
  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    next(err);
  }
};

//first we gonna find the book in our database.then we gonna check its user id.if its user id equals our id
export const deleteBook = async (req, res, next) => {
  if (!req.isAdmin)
    return next(showError(403, "Only Admins can delete a book"));
  try {
    const deletedBook = await Book.findOneAndDelete({
      booktitle: new RegExp("^" + req.params.title + "$", "i"),
    });
    if (!deletedBook) {
      return next(showError(404, "Book not found"));
    }
    res.status(200).json({ message: "Book has been deleted" });
  } catch (err) {
    next(err);
  }
};
export const getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) next(showError(403, "There is No book"));
    res.status(200).send(book);
  } catch (err) {
    next(err);
  }
};

export const getBookByTitle = async (req, res, next) => {
  try {
    const book = await Book.findOne({
      booktitle: new RegExp("^" + req.params.title + "$", "i"),
    });
    if (!book) {
      return next(showError(404, "book not found"));
    }
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

export const getBooks = async (req, res, next) => {
  const query = req.query;

  const myFilter = {
    ...(query.category && { category: { $regex: query.category, $options: "i" } }), // Case-insensitive regex
    ...(query.search && { booktitle: { $regex: query.search, $options: "i" } }),
  };

  try {
    const books = await Book.find(myFilter);
    res.status(200).send(books);
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { booktitle: new RegExp("^" + req.params.title + "$", "i") }, 
      {
        $set: {
          booktitle: req.body.booktitle || '',
          bookdesc: req.body.bookdesc || '',
          category: req.body.category || '',
          image: req.body.image || '',
          inStock: req.body.inStock || '',
          author: req.body.author || '',
        },
      },
      { new: true }
    );

    // If the category doesn't exist, return an error
    if (!updatedBook) {
      return next(showError(404, "Book not found"));
    }

    res.status(200).json(updatedBook);
  } catch (err) {
    // Handle errors
    next(err);
  }
};

export const getBooksCount = async (req, res,next) => {
  try {
    const count = await Book.find().count().exec();
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    next(err);
  }
};