export default {
  paymentMethod:{
    all:[
        'COD',
        'ONLINE',
    ],
    cod:'COD',
    online:'ONLINE',
    codName:"thánh toán khi nhận hàng",
    onlineName:"thanh toán bằng vnpay",
  },
  status: {
    all: [
      "wait_for_confirm",
      "confirmed",
      "delivering",
      "completed",
      "cancelled",
    ],
    delivering: "delivering",
    confirmed: "confirmed",
    completed: "completed",
    waitForConfirm: "wait_for_confirm",
    cancelled: "cancelled",
  },
  permissions: {
    seller: ["cancelled", "confirmed", "delivering", "completed"],
    customer: ["cancelled", "completed"],
  },
  allowCancel: ["wait_for_confirm", "confirmed"],
  allowDelete: ["wait_for_confirm", "cancelled", "completed"],
  configAllStatus: [
    { name: "Đang chờ xác nhận", value: "wait_for_confirm" },
    { name: "Đã xác nhận", value: "confirmed" },
    { name: "Đang giao", value: "delivering" },
    { name: "Hoàn thành", value: "completed" },
    { name: "Đã hủy", value: "cancelled" },
  ],
  configActionStatusShop: {
    waitForConfirm: [
      {
        id: 1,
        name: "xác nhận",
        value: "confirmed",
        isRequireReason: false,
        color: "#43a047",
      },
      {
        id: 2,
        name: "hủy đơn",
        value: "cancelled",
        isRequireReason: true,
        color: "#e64a19",
      },
    ],
    confirmed: [
      {
        id: 1,
        name: "đang vận chuyển",
        value: "delivering",
        isRequireReason: false,
        color: "#43a047",
      },
      {
        id: 2,
        name: "hủy đơn",
        value: "cancelled",
        isRequireReason: true,
        color: "#f44336",
      },
    ],
    delivering: [
      {
        id: 1,
        name: "đã giao hàng",
        value: "completed",
        isRequireReason: false,
        color: "#43a047",
      },
    ],
  },
  configActionStatusCustomer: {
    waitForConfirm: [
      {
        id: 1,
        name: "hủy đơn",
        value: "cancelled",
        isRequireReason: true,
        color: "#e64a19",
      },
    ],
    confirmed: [
      {
        id: 2,
        name: "hủy đơn",
        value: "cancelled",
        isRequireReason: true,
        color: "#e64a19",
      },
    ],
    delivering: [
      {
        id: 3,
        name: "đã nhận hàng",
        value: "completed",
        isRequireReason: false,
        color: "#43a047",
      },
    ],
  },
};
