import { Response } from "express";
import { Request } from "express-jwt";
import delivery from "../../../modules/delivery";
import response from "../../../ultilities/response";
import services from "../../services";
import redis from "../../../modules/redis";

const getProvinces = async (req: Request, res: Response) => {
  const [data, err] = await services.address.getProvinces();
  const key = redis.key.payment("16aa3dab-45e9-418d-b574-2bbe1b379e55");
  let payload = await redis.get.byKey(key)
  if (payload)
  payload = JSON.parse(payload)
  console.log(payload)
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
