import { Response } from "express";
import { Request } from "express-jwt";
import delivery from "../../../modules/delivery";
import response from "../../../ultilities/response";
import { IServicePayload } from "../../../interfaces/delivery";

const getServices = async (req: Request, res: Response) => {
  const payload = req.body as IServicePayload;
  const [data, err] = await delivery.shippingOrder.getServices(payload);
  if (err) {
    return response.r400(res, {}, err.message);
  }
  return response.r200(res, data);
};

export default {
  getServices,
}