import services from "../../services";
import response from "../../../ultilities/response";
import { Response } from "express";
import { Request } from "express-jwt";
import {
  IVoucherDeletePayload,
  IVoucherPayload,
  IVoucherUpdatePayload,
} from "../../../interfaces/voucher";

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

const update = async (req: Request, res: Response) => {
  const payload = req.body as IVoucherUpdatePayload;
  payload.id = req.params.id;

  const err = await services.voucher.update.byId(payload);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res);
};

const remove = async (req: Request, res: Response) => {
  const payload = {
    id: req.params.id,
    role: req.auth?.role,
    currentUserId: req.auth?.id,
  } as IVoucherDeletePayload;

  const err = await services.voucher.del.byId(payload);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res);
};

export default {
  create,
  getActive,
  update,
  remove,
};
