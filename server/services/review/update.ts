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
    return Error("No permission");
  }

  const err = await dao.review.update.statusById(
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
