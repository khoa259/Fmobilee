import bcrypt from "bcryptjs";
// bcrypt dùng để mã hóa mật khẩu
const User = [
  {
    name: "Nguyen Khoa",
    email: "khoa10688@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Bui Viet Toai",
    email: "toaibui1409@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Nguyen Khoa 25",
    email: "khoa@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Bui Viet Toai 14",
    email: "viettoai1409@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];
export default User;
