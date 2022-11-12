import express, { Express, Router } from "express";
import controllers from "../controllers";

export default (e: Router) => {
  const r = express.Router();
  e.use("/reviews", r);

  r.post("/", controllers.review.create);

  r.get("/", controllers.review.findByProduct);

  r.put("/:id", controllers.review.updateById);

  r.delete("/:id", controllers.review.removeById);
};
