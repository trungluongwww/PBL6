import services from "../index";
import { IOrderDetailQuery } from "../../../interfaces/order";
import { Review } from "../../../modules/database/entities";
import dao from "../../dao";
import { IReviewCreatePayload } from "../../../interfaces/review";
import constants from "../../../constants";

export default async (payload: IReviewCreatePayload): Promise<Error | null> => {
  const [order, _] = await dao.order.find.byId(payload.order, payload.userType);
  if (!order) {
    return Error("Order not found");
  }

  if (order.status != constants.order.status.completed) {
    return Error("không thể đánh giá lúc này");
  }

  if (await checkReviewExist(order.id)) {
    return Error("Already exist");
  }
  let rating =
    payload.rating >= 1 && payload.rating <= 5 ? Math.round(payload.rating) : 0;
  const review = new Review();
  review.orderId = order.id;
  review.customerId = order.customerId;
  review.productIds = order.productIds;
  review.content = payload.content;
  review.rating = rating;

  const err = await dao.review.create(review);
  if (err) {
    return Error("Common something error");
  }

  return null;
};

const checkReviewExist = async (idorder: string): Promise<boolean> => {
  const [rs, err] = await dao.review.find.byOrderId(idorder);

  if (rs) {
    return true;
  }
  return false;
};
