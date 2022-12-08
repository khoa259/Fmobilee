import fireAdmin from "../firebase/index.js";
import User from "../models/User.js";

export const authCheck = async (req, res, next) => {
  // console.log(req.headers); //token
  try {
    const firebaseUser = await fireAdmin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    // console.log("firebase in auth", firebaseUser);
    req.user = firebaseUser;
  } catch (error) {
    res.status(401).json({
      err: "Invalid or expired token",
    });
  };
  next();
};

export const adminCheck = async (req, res, next) => {
  const { email } = req.user;
  // console.log("email", email);
  const adminUser = await User.findOne({ email }).exec();
  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Admin resource. Access dinied",
    });
  } else {
    next();
  }
};
