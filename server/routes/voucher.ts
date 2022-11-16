import express, { Router } from "express";
import controllers from "../controllers";
import required from "./required";
import permis from "../../constants/permission";
import validations from "./validations";

export default (e: Router) => {
  const r = express.Router();
  e.use("/vouchers", r);

  r.post(
    "/",
    required.permission(permis.role.admin),
    validations.voucher.create,
    controllers.voucher.create
  );

  r.put(
    "/:id",
    required.permission(permis.role.admin),
    validations.voucher.update,
    controllers.voucher.update
  );

  r.delete(
    "/:id",
    required.permission(permis.role.admin),
    validations.voucher.remove,
    controllers.voucher.remove
  );

  r.get("/", controllers.voucher.getActive);
};
