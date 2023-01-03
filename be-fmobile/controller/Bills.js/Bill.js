import Bills from "../../models/Bills.js";
import cart from "../../models/cart.js";

export const createBill = async (req, res) => {
  try {
    const {
      products,
      billTotal,
      orderdBy,
      bankCode,
      username,
      timePayment,
      status,
      idCart,
      tradingCode,
    } = req.body;

    //check user co ton tai trong db hay ko
    //user -> findById({id: orderdBy})

    //check {{products, billTotal, orderdBy} co dung dinh dang model hay ko
    const bill = {
      products,
      billTotal,
      orderdBy,
      bankCode,
      status,
      username,
      timePayment,
      tradingCode,
    };
    await new Bills(bill).save();

    const cartPrd = await cart.findOne({ _id: idCart });
    const updateCart = await cart.findByIdAndUpdate(cartPrd._id, {
      products: [],
      cartTotal: 0,
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
export const listBill = async (req, res) => {
  try {
    const listBill = await Bills.find({}).sort({ createdAt: -1 }).exec();
    res.json(listBill);
  } catch (error) {
    console.log("error", error);
    res
      .status(400)
      .json({ message: "Không thể hiện thị được danh sách đơn hàng" });
  }
};

export const detailBill = async (req, res) => {
  try {
    const bill = await Bills.findOne({ _id: req.params.id }).exec();
    res.json(bill);
  } catch (error) {
    console.log(error.message);
  }
};
