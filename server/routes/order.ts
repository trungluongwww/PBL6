import express, { Express } from "express";
import controllers from "../controllers";

export default (e: Express) => {
  const r = express.Router();
  e.use("/orders", r);

  r.post("/", controllers.order.create);
};
