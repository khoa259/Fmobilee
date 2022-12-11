import Bills from "../../models/Bills.js";

export const createBill = async (req, res) => {
  try {
    const { products, billTotal, orderdBy } = req.body;

    //check user co ton tai trong db hay ko
    //user -> findById({id: orderdBy})

    //check {{products, billTotal, orderdBy} co dung dinh dang model hay ko

    const bill = await new Bills(req.body).save();
    return res.status(200).json({
      success: true,
      message: "Save bill successfully",
    });
  } catch (error) {
    res.status(400).json({ message: "không thể tạo mới" });
  }
};
