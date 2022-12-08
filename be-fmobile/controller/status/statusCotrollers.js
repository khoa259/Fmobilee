import Status from "../../models/Status.js";

export const createStatus = async (req, res) => {
  try {
    const status = await new Status(req.body).save();
    res.json(status);
    console.log(status);
  } catch (error) {
    res.status(400).json({ message: "không thể tạo mới" });
  }
};

export const getStatus = async (req, res) => {
  try {
    const status = await Status.findOne({ _id: req.params.id }).exec();
    res.json(status);
  } catch (error) {
    res.status(400).json({ message: "Không thể tìm thấy trạng thái" });
  }
};

export const listStatus = async (req, res) => {
  try {
    const status = await Status.find({}).exec();
    res.json(status);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Không thể hiển thị danh sách trạng thái" });
  }
};
