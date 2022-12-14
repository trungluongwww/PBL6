import { param, body, query } from "express-validator";
import { bodyId, checkErrors, paramId } from "./check-errors";
import constants from "../../../constants";

const search = () => {
  return [
    query("page").isNumeric(),
    query("limit").isNumeric(),
    query("status")
      .isIn(constants.order.status.all)
      .withMessage("invalid status token"),
  ];
};

const create = () => {
  return [
    body([
      "address",
      "serviceId",
      "voucherId",
    ])
      .notEmpty()
      .withMessage("some fields is empty value"),
    bodyId("shopId"),
  ];
};

const calculate = () => {
  return [
    body([
      "serviceId",
      "voucherId",
    ])
        .notEmpty()
        .withMessage("some fields is empty value"),
    bodyId("shopId"),
  ];
};

const updateStatus = () => {
  return [
    body(["status"]).notEmpty().withMessage("some fields is empty value"),
    body("status")
      .isIn(constants.order.status.all)
      .withMessage("invalid status token"),
  ];
};

export default {
  search: [search(), checkErrors],
  getDetail: [paramId(), checkErrors],
  create: [create(), checkErrors],
  calculate:[calculate(),checkErrors],
  updateStatus: [updateStatus(), paramId(), checkErrors],
  delete: [paramId(), checkErrors],
};
