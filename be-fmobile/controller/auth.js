import Users from "../models/user.js";

export const createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await Users.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );
  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new Users({
      email,
      name,
      picture,
    }).save();
    console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};
