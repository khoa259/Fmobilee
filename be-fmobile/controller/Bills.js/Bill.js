import Bills from "../../models/Bills.js";

export const createBill = async (req, res) => {
  try {
    const bill = await new Bills(req.body).save();
    res.json(bill);
  } catch (error) {
    res.status(400).json({ message: "không thể tạo mới" });
  }
};
