import { Response } from "express";
import { Request } from "express-jwt";
import response from "../../../ultilities/response";
import services from "../../services";

const getProvinces = async (req: Request, res: Response) => {
  const [data, err] = await services.address.getProvinces();
  if (err) {
    return response.r400(res, {}, err.message);
  }
  return response.r200(res, data);
};

const getDistricts = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const [data, err] = await services.address.getDistricts(id);
  if (err) {
    return response.r400(res, {}, err.message);
  }
  return response.r200(res, data);
};

const getWards = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const [data, err] = await services.address.getWards(id);
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
