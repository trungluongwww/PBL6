import services from "../../services";
import response from "../../../ultilities/response";
import { Response } from "express";
import { Request } from "express-jwt";
import { IVoucherPayload } from "../../../interfaces/voucher";

const create = async (req: Request, res: Response) => {
  const payload = req.body as IVoucherPayload;

  const err = await services.voucher.create(payload);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res);
};

const getActive = async (req: Request, res: Response) => {
  const [rs, err] = await services.voucher.find.active();

  if (err) {
    return response.r400(res, null, err.message);
  } else {
    return response.r200(res, rs);
  }
};

export default {
  create,
  getActive,
};
