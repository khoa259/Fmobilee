import Bills from "../../models/Bills.js";
import cart from "../../models/cart.js";

export const createBill = async (req, res) => {
  try {
    const { products, billTotal, orderdBy, bankCode, status, idCart } =
      req.body;

    //check user co ton tai trong db hay ko
    //user -> findById({id: orderdBy})

    //check {{products, billTotal, orderdBy} co dung dinh dang model hay ko

    const bill = await new Bills({
      products,
      billTotal,
      orderdBy,
      bankCode,
      status,
    }).save();

    const cartPrd = await cart.findOne({ _id: idCart });
    console.log("cartPrd", cartPrd);
    const updateCart = await cart.findByIdAndUpdate(cartPrd._id, {
      products: [],
    });

    return res.status(200).json({
      success: true,
      message: "Save bill successfully",
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: "không thể tạo mới" });
  }
};
