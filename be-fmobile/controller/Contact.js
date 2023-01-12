import Contact from "../models/Contact.js";

export const addContact = async (req, res) => {
  try {
    const contact = await Contact(req.body).save();
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
