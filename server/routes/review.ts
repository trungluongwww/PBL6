import express, { Express, Router } from "express";
import controllers from "../controllers";
import validations from "./validations";
import required from "./required";

export default (e: Router) => {
  const r = express.Router();
  e.use("/reviews", r);

  r.post(
    "/",
    required.login,
    ...validations.review.create,
    controllers.review.create
  );

  r.get("/", controllers.review.findByProduct);

  r.get(
    "/:id",
    required.login,
    ...validations.review.findByOrder,
    controllers.review.findByOrderId
  );

  r.put(
    "/:id",
    required.login,
    ...validations.review.update,
    controllers.review.updateById
  );

  r.delete(
    "/:id",
    required.login,
    ...validations.review.remove,
    controllers.review.removeById
  );
};
