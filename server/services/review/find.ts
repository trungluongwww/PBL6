import dao from "../../dao";
import { Review } from "../../../modules/database/entities";
import { IReviewQuery } from "../../../interfaces/review";

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
  const [reviews, count, err] = await dao.review.find.pageByProductId(
    query.product,
    limit,
    skip,
    rating
  );

  if (err) {
    return [null, Error("Common somethong error")];
  }

  let totalRating = 0;
  reviews.forEach((review) => {
    totalRating += review.rating;
  });

  return [
    {
      numOfPage: Math.floor(count / limit) + 1,
      limit: limit,
      page: query.page,
      reviews: reviews,
      totalRating: totalRating / reviews.length,
    },
    null,
  ];
};

const byOrderId = async (
  orderId: string
): Promise<[Review | null, Error | null]> => {
  const [rv, err] = await dao.review.find.byOrderId(orderId);
  return [rv, err];
};

export default {
  pageByProductId,
  byOrderId,
};
