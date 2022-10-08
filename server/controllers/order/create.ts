import { Response } from "express";
import { Request } from "express-jwt";
import { IOrderCreatePayload } from "../../../interfaces/order";
import services from "../../services";
import response from "../../../ultilities/response";

export default async (req: Request, res: Response) => {
  const payload = req.body as IOrderCreatePayload;
  const err = await services.order.create(payload);
  if (err) {
    return response.r400(res, {}, err.message);
  }
  return response.r200(res);
};
