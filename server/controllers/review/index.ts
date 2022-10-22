import { Request } from "express-jwt";
import {
  IOrderDetailQuery,
  IOrderQuerySearchByUser,
} from "../../../interfaces/order";
import services from "../../services";
import response from "../../../ultilities/response";
import { Response } from "express";
import {
  IReviewCreatePayload,
  IReviewQuery,
  IReviewUpdatePayload,
} from "../../../interfaces/review";

const create = async (req: Request, res: Response) => {
  const payload = req.body as IReviewCreatePayload;
  payload.userType = req.auth?.role;
  payload.currentUserId = req.auth?.id;

  const err = await services.review.create(payload);
  if (err) {
    return response.r400(res, {}, err.message);
  }
  return response.r200(res);
};

const findByProduct = async (req: Request, res: Response) => {
  const query = {
    userType: req.auth?.role,
    currentUserId: req.auth?.id,
    product: req.query.product,
    limit: Number(req.query.limit) || 20,
    rating: Number(req.query.rating) || 0,
    page: Number(req.query.page) || 1,
  } as IReviewQuery;

  const [rs, err] = await services.review.find.pageByProductId(query);
  if (err) {
    return response.r400(res, {}, err.message);
  }
  return response.r200(res, rs);
};

const updateById = async (req: Request, res: Response) => {
  const payload = req.body as IReviewUpdatePayload;
  payload.reviewId = req.params.id;
  payload.userType = req.auth?.role;
  payload.currentUserId = req.auth?.id;

  const err = await services.review.update.byId(payload);
  if (err) {
    return response.r400(res, {}, err.message);
  }

  return response.r200(res, {});
};

export default {
  findByProduct,
  create,
  updateById,
};
