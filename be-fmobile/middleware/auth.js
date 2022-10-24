import fireAdmin from "../firebase/index.js";

export const authCheck = (req, res, next) => {
  console.log(req.headers); //token
  next();
};
