import { Request } from "express-jwt";
import { Response } from "express";
import response from "../../../ultilities/response";
import constants from "../../../constants";

const getAllConfigStatusOrder = async (req: Request, res: Response) => {
  const data = constants.order.configAllStatus;
  return response.r200(res, data);
};

export default {
  getAllConfigStatusOrder,
};
