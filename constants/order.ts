export default {
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
};
