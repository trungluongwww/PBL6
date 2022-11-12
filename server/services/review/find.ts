import dao from "../../dao";
import { Review } from "../../../modules/database/entities";
import { IReviewQuery } from "../../../interfaces/review";
import database from "../../../modules/database";

interface IReviewResponse {
  reviews: Review[];
  totalRating: number;
  limit: number;
  page: number;
  numOfPage: number;
}

const pageByProductId = async (
  query: IReviewQuery
): Promise<[IReviewResponse | null, Error | null]> => {
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

  const [count, avg] = await dao.review.find.infoReviewByProductId(
    query.product
  );

  if (err) {
    return [null, Error("Common somethong error")];
  }
  return [
    {
      numOfPage: Math.floor(count / limit) + 1,
      limit: limit,
      page: query.page,
      reviews: reviews,
      totalRating: avg,
    },
    null,
  ];
};

export default {
  pageByProductId,
};
