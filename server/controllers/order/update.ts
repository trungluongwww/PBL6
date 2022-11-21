import { Response } from "express";
import { Request } from "express-jwt";
import { IOrderUpdateStatusPayload } from "../../../interfaces/order";
import services from "../../services";
import response from "../../../ultilities/response";

const status = async (req: Request, res: Response) => {
  const payload = {
    orderId: req.params.id,
    status: req.body.status,
    currentUserId: req.auth?.id,
    userType: req.auth?.role,
    reason: req.body.reason,
  } as IOrderUpdateStatusPayload;
  const err = await services.order.update.status(payload);
  if (err) {
    return response.r400(res, {}, err.message);
  }
  return response.r200(res);
};

export default {
  status,
};
