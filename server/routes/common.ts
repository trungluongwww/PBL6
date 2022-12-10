import express, { Express, Router } from "express";
import querystring from "qs";
import crypto from "crypto";
import dateFormat from 'dateformat'
import common from "../controllers/common";
import * as Sentry from "@sentry/node";

export default (r: Router) => {

  r.get("/provinces", common.masterData.getProvinces);
  r.get("/wards/:id", common.masterData.getWards);
  r.get("/districts/:id", common.masterData.getDistricts);
  r.get("/config-order", common.config.getAllConfigStatusOrder);
  r.get("/config-order/data-center", common.config.getAllConfigOrderDatacenter);
  r.post("/fee", common.shippingOrder.getPreviewFee);
  r.post("/services", common.shippingOrder.getServices);

};

