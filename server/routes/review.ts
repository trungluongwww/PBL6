import express, { Express } from "express";
import controllers from "../controllers";

export default (e: Express) => {
  const r = express.Router();
  e.use("/reviews", r);

  r.post("/", controllers.review.create);

  r.get("/", controllers.review.findByProduct);

  r.put("/:id", controllers.review.updateById);
};
