import fireAdmin from "../firebase/index.js";

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
  }
  next();
};
