import { Response } from "express";
import { Request } from "express-jwt";
import delivery from "../../../modules/delivery";
import response from "../../../ultilities/response";

const getProvinces = async (req: Request, res: Response) => {
  const [data, err] = await delivery.masterData.getProvinces();
  if (err) {
    return response.r400(res, {}, err.message);
  }
  return response.r200(res, data);
};

const getDistricts = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const [data, err] = await delivery.masterData.getDistricts(id);
  if (err) {
    return response.r400(res, {}, err.message);
  }
  return response.r200(res, data);
};

const getWards = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const [data, err] = await delivery.masterData.getWards(id);
  if (err) {
    return response.r400(res, {}, err.message);
  }
  return response.r200(res, data);
};

export default {
  getProvinces,
  getDistricts,
  getWards,
};
