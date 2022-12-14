import { body, param, query } from "express-validator";
import { checkErrors, paramId } from "./check-errors";

const create = () => {
  return [
    body(["order", "content"]).isString().notEmpty(),
    body("rating").isNumeric().notEmpty(),
  ];
};

const update = () => {
  return [
    body(["rating", "content"]).notEmpty().withMessage("some field is empty"),
  ];
};

const remove = () => {
  return [paramId()];
};

const findByOrder = () => {
  return [paramId()];
};

export default {
  create: [...create(), checkErrors],
  update: [...update(), paramId(), checkErrors],
  remove: [...remove(), checkErrors],
  findByOrder: [...findByOrder(), checkErrors],
};
