import { IReviewUpdatePayload } from "../../../interfaces/review";
import dao from "../../dao";

const byId = async (payload: IReviewUpdatePayload): Promise<Error | null> => {
  let rating =
    payload.rating >= 1 && payload.rating <= 5 ? Math.round(payload.rating) : 0;
  const [review, _] = await dao.review.find.byId(payload.reviewId);

  if (!review) {
    return Error("Not found");
  }
  if (review.customerId != payload.currentUserId) {
    return Error("bạn không có quyền thực hiện hành động này ");
  }

  const err = await dao.review.update.byId(
    payload.reviewId,
    payload.content,
    rating
  );

  if (err) {
    return err;
  }
  return null;
};

export default {
  byId,
};
