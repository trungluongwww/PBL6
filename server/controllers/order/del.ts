import { Response } from "express";
import { Request } from "express-jwt";
import {
  IOrderCreatePayload,
  IOrderDeletePayload,
  IOrderUpdateStatusPayload,
} from "../../../interfaces/order";
import services from "../../services";
import response from "../../../ultilities/response";
import constants from "../../../constants";

export default async (req: Request, res: Response) => {
  const payload = {
    orderId: req.params.id,
    typeUser: req.auth?.role || req.body.typeUser,
    currentUserId: req.auth?.id,
  } as IOrderDeletePayload;

  const err = await services.order.del(payload);
  if (err) {
    return response.r400(res, {}, err.message);
  }
  return response.r200(res);
};
