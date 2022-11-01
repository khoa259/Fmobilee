import Users from "../models/User.js";

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
    console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};

export const currentUser = async (req, res) => {
  Users.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
