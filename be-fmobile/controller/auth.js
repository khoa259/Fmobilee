import Users from "../models/User.js";
import Cart from "../models/cart.js";

export const createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await Users.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );
  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new Users({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    // if (newUser) {
    //   let newCart = await new Cart({
    //     orderdBy: newUser._id,
    //   }).save();
    //
    // }
    res.json(newUser);
  }
};

export const currentUser = async (req, res) => {
  Users.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
