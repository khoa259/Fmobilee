import fireAdmin from "../firebase/index.js";

export const authCheck = (req, res, next) => {
  console.log(req.header); //token
  next();
};
