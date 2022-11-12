import express, { Router } from "express";
import controllers from "../controllers";
import required from "./required";
import permis from "../../constants/permission";

export default (e: Router) => {
  const r = express.Router();
  e.use("/vouchers", r);

  r.post(
    "/",
    required.permission(permis.role.admin),
    controllers.voucher.create
  );

  r.get("/", controllers.voucher.getActive);
};
