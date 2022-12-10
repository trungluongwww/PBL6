import { Response } from "express";
import { Request } from "express-jwt";
import {IOrderCalculatePayload, IOrderCreatePayload, IPaymentOnlinePayload} from "../../../interfaces/order";
import services from "../../services";
import response from "../../../ultilities/response";

const one =  async (req: Request, res: Response) => {
  const payload = req.body as IOrderCreatePayload;
  payload.toDistrictId = Number(payload.toDistrictId);
  payload.serviceId = Number(payload.serviceId);

  payload.customerId = req.auth?.id;
  const err = await services.order.create(payload);
  if (err) {
    return response.r400(res, {}, err.message);
  }
  return response.r200(res);
};

const payment = async (req: Request, res: Response) => {
  const payload = req.body as IOrderCreatePayload;
  payload.serviceId = Number(payload.serviceId);
  payload.customerId = req.auth?.id;
  const [rs,err] = await services.order.payment.createPayment(payload);
  if (err) {
    return response.r400(res, {}, err.message);
  }

  return response.r200(res,rs);
};

const fromPayment = async (req:Request,res:Response)=>{
  const payload = req.body as IPaymentOnlinePayload
  console.log(payload)
  return response.r200(res,null);
}
export default {
  one,payment
}