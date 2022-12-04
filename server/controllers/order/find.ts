import { Request } from "express-jwt";
import {
  IOrderCalculatePayload,
  IOrderCreatePayload,
  IOrderDetailQuery,
  IOrderQuerySearchByUser,
} from "../../../interfaces/order";
import services from "../../services";
import response from "../../../ultilities/response";
import { Response } from "express";
import { addAbortSignal } from "stream";

const pageByUser = async (req: Request, res: Response) => {
  const query: IOrderQuerySearchByUser = req.query as never;
  query.currentUserId = req.auth?.id;
  query.userType = req.auth?.role;
  const [rs, err] = await services.order.find.pageByClientId(query);
  if (err) {
    return response.r400(res, {}, err.message);
  }
  return response.r200(res, rs);
};

const byId = async (req: Request, res: Response) => {
  const query = {
    orderId: req.params.id,
    currentUserId: req.auth?.id,
    userType: req.auth?.role,
  } as IOrderDetailQuery;

  const [rs, err] = await services.order.find.byId(query);
  if (err) {
    return response.r400(res, {}, err.message);
  }
  return response.r200(res, rs);
};

const createPayment = async (req: Request, res: Response) => {
  const payload = req.body as IOrderCalculatePayload;
  payload.serviceId = Number(payload.serviceId);
  payload.customerId = req.auth?.id;
  payload.header = req.headers['x-forwarded-for'] || ""
  const [rs,err] = await services.order.payment.createPayment(payload);
  if (err) {
    return response.r400(res, {}, err.message);
  }

  return response.r200(res,rs);
};
export default {
  pageByUser,
  byId,
  createPayment,
};
