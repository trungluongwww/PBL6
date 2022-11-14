import express, { Express, Router } from "express";
import controllers from "../controllers";
import validations from "./validations";

export default (e: Router) => {
  const r = express.Router();
  e.use("/reviews", r);

  r.post("/", ...validations.review.create, controllers.review.create);

  r.get("/", controllers.review.findByProduct);

  r.put("/:id", ...validations.review.update, controllers.review.updateById);

  r.delete("/:id", ...validations.review.remove, controllers.review.removeById);
};
