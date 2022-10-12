import bcrypt from "bcryptjs";
// bcrypt dùng để mã hóa mật khẩu
const User = [
  {
    name: "Nguyen Khoa",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Bui Viet Toai",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Nguyen Khoa 25",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Bui Viet Toai 14",
    password: bcrypt.hashSync("123456", 10),
  },
];
export default User;
