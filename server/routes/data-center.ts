import express, {Router} from "express";
import required from "./required";
import validations from "./validations";
import controllers from "../controllers";
import constants from "../../constants";

export default (e: Router) => {
    const r = express.Router();
    e.use("/data-center", required.login, r);

    r.post(
        "/order/me",
        required.permission(constants.account.role.shop),
        controllers.dataCenter.getMeDataCenter
    );
};
