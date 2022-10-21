import express, { Express } from "express";
import controllers from "../controllers";

export default (e: Express) => {
  const r = express.Router();
  e.use("/orders", r);

  r.post("/", controllers.order.create);

  r.get("/", controllers.order.find.pageByUser);

  r.get("/:id", controllers.order.find.byId);

  r.patch("/:id/shop", controllers.order.update.statusBySeller);
  r.patch("/:id/customer", controllers.order.update.statusByCustomer);

  r.delete("/:id", controllers.order.del);
};
