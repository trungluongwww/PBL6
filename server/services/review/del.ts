import services from "../index";
import dao from "../../dao";
import { IRemoveReviewPayload } from "../../../interfaces/review";

const byId = async (payload: IRemoveReviewPayload) => {
  const [rv, er] = await dao.review.find.byId(payload.id);
  if (!rv) {
    return Error("not found");
  }

  if (rv.customerId != payload.currentUserId) {
    return Error("no permission");
  }

  const err = await dao.review.del.byId(rv.id);

  return err;
};

export default {
  byId,
};
