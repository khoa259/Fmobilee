import { Router } from "express";
var router = Router();
import $ from "jquery";
import dateFormat from "dateformat";
import crypto from "crypto";
import qs from "qs";
import querystring from "qs";
router.get("/", function (req, res, next) {
  res.render("orderlist", { title: "Danh sách đơn hàng" });
});

router.get("/create_payment_url", function (req, res, next) {
  var dateFormat = require("dateformat");
  var date = new Date();

  var desc =
    "Thanh toan don hang thoi gian: " + dateFormat(date, "yyyy-mm-dd HH:mm:ss");
  res.render("order", {
    title: "Tạo mới đơn hàng",
    amount: 10000,
    description: desc,
  });
});

router.post("/create_payment_url", function (req, res, next) {
  var ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  //   var config = require("config");
  var tmnCode = "71JUNFKK";
  var secretKey = "JEMWOMOPSJHWVPXDUPGFEZFXFPDVJGTZ";
  var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  var returnUrl = "http://localhost:8888/order/vnpay_return";

  var date = new Date();

  var createDate = dateFormat(date, "yyyymmddHHmmss");
  var orderId = dateFormat(date, "HHmmss");
  var amount = req.body.amount;
  var bankCode = "NCB";

  var orderInfo = "DEMO";
  var orderType = "billpayment";
  var locale = "vn";
  if (locale === null || locale === "") {
    locale = "vn";
  }
  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  vnp_Params["vnp_OrderType"] = orderType;
  vnp_Params["vnp_Amount"] = req.body.amount;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  var signData = querystring.stringify(vnp_Params, { encode: false });

  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
  console.log("vnpUrl", vnpUrl);
  // console.log("vnpJSon", vnpUrl?.toJSON());

  res.json({ url: vnpUrl });
});

router.get("/vnpay_return", function (req, res, next) {
  // logic dùng window.location.search để lấy full param +&idUser=...
  //Fe truyền xuống đầy đủ thông tin trên URL dc trả về và idUser lấy các thông tin để lưu bill
  var vnp_Params = req.query;
  console.log(vnp_Params);
  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  console.log("vnp_Params", vnp_Params);

  //   var config = require("config");
  //   var tmnCode = "71JUNFKK";
  var secretKey = "JEMWOMOPSJHWVPXDUPGFEZFXFPDVJGTZ";

  //   var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  //   var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  console.log(123, signed);
  console.log("secureHash", secureHash);
  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
    console.log(1, vnp_Params["vnp_ResponseCode"]);
    return res.status(200).json({
      message: vnp_Params,
    });
    // res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
    //get ra cart theo idUser lấy hết sản phẩm từ card nhét vào bill
    // FE gửi thông tin xuống thành công thì lưu bill (xem bảng bill đã có trường daThanhToan) daThanhToan = true status = chờ xác nhận
    // sau khi lưu bill thành công thì xóa hét sản phẩm trogn cart chỉ xóa sản phẩm trang cart chứ k xóa cart
  } else {
    console.log(2);
    res.render("success", { code: "97" });
  }
});

router.get("/vnpay_ipn", function (req, res, next) {
  var vnp_Params = req.query;
  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  var config = require("config");
  var secretKey = config.get("vnp_HashSecret");
  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    var orderId = vnp_Params["vnp_TxnRef"];
    var rspCode = vnp_Params["vnp_ResponseCode"];
    //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
    res.status(200).json({ RspCode: "00", Message: "success" });
  } else {
    res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
  }
  res.json({
    vnp_Params,
  });
});

function sortObject(obj) {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

export default router;
