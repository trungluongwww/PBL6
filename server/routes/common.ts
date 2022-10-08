import express, { Express } from "express";
import common from "../controllers/common";

export default (e: Express) => {
  const r = express.Router();

  e.use("/", r);
  r.get("/provinces", common.masterData.getProvinces);
  r.get("/wards/:id", common.masterData.getWards);
  r.get("/districts/:id", common.masterData.getDistricts);
  r.post("/fee", common.shippingOrder.getPreviewFee);
  r.post("/services", common.shippingOrder.getServices);
};
