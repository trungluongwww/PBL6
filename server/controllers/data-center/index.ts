import { Request } from "express-jwt";
import { Response } from "express";
import constants from "../../../constants";
import response from "../../../ultilities/response";
import { IOrderDataCenterQuery } from "../../../interfaces/data-center/order";
import services from "../../services";

const getMeDataCenter = async (req: Request, res: Response) => {
  const query = req.body as IOrderDataCenterQuery;
  query.shopId = req.auth?.id;
  const [rs, err] = await services.dataCenter.order.getCommonDatacenter(query);
  if (err) {
    return response.r400(res, null, err.message);
  }
  return response.r200(res, rs);
};

export default {
  getMeDataCenter,
};
