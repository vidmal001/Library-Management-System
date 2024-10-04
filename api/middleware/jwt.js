import jwt from "jsonwebtoken";
import showError from "../utils/errors.js";

export const verify = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(showError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_SECRET_KEY , async (err, payload) => {
    if (err) return next(showError(403, "token is not valid!"));
    req.userId = payload.id;
    req.isAdmin = payload.isAdmin;
    next();
  });
};
