import { Response } from "express";
import { Request } from "express-jwt";
import delivery from "../../../modules/delivery";
import response from "../../../ultilities/response";
import {
  IDeliveryPreviewFeePayload,
  IGHNServicePayload,
} from "../../../interfaces/delivery";

const getServices = async (req: Request, res: Response) => {
  const payload = req.body as IGHNServicePayload;
  payload.from_district = Number(payload.from_district);
  payload.to_district = Number(payload.to_district);

  const [data, err] = await delivery.shippingOrder.getServices(payload);
  if (err) {
    return response.r400(res, {}, err.message);
  }
  return response.r200(res, data);
};

const getPreviewFee = async (req: Request, res: Response) => {
  const payload = req.body as IDeliveryPreviewFeePayload;
  payload.to_district_id = Number(payload.to_district_id);
  payload.from_district_id = Number(payload.from_district_id);

  const [data, err] = await delivery.shippingOrder.calculateFee(payload, null);
  if (err) {
    return response.r400(res, {}, err.message);
  }
  return response.r200(res, data);
};

export default {
  getServices,
  getPreviewFee,
};
