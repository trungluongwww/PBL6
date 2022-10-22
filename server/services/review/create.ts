import services from "../index";
import { IOrderDetailQuery } from "../../../interfaces/order";
import { Review } from "../../../modules/database/entities";
import dao from "../../dao";
import { IReviewCreatePayload } from "../../../interfaces/review";

export default async (payload: IReviewCreatePayload): Promise<Error | null> => {
  const [order, _] = await dao.order.find.byId(payload.order, payload.userType);
  if (!order) {
    return Error("Order not found");
  }

  if (await checkReviewExist(order.id)) {
    return Error("Already exist");
  }

  const review = new Review();
  review.orderId = order.id;
  review.customerId = order.customerId;
  review.productIds = order.productIds;
  review.content = payload.content;
  review.rating = payload.rating;

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
