import { body } from "express-validator";
import { paramId } from "./check-errors";
import _ from "lodash";
const create = () => {
  return [
    body([
      "name",
      "description",
      "code",
      "discountPercent",
      "discountValue",
      "quantity",
      "isActive",
    ]).notEmpty(),
  ];
};
export default {
  create: [...create()],
  update: [...create(), paramId()],
  remove: [paramId()],
};
