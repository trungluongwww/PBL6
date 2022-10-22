import dao from "../../dao";
import { Review } from "../../../modules/database/entities";
import { IReviewQuery } from "../../../interfaces/review";

const pageByProductId = async (
  query: IReviewQuery
): Promise<[Array<Review>, Error | null]> => {
  let limit = query.limit > 0 ? Math.round(query.limit) : 20;
  let skip = query.page >= 1 ? (Math.round(query.page) - 1) * query.limit : 0;
  let rating =
    query.rating >= 1 && query.rating <= 5 ? Math.round(query.rating) : 0;
  const [reviews, err] = await dao.review.find.pageByProductId(
    query.product,
    limit,
    skip,
    rating
  );

  if (err) {
    return [[], Error("Common somethong error")];
  }
  return [reviews, null];
};

export default {
  pageByProductId,
};
