interface IReviewCreatePayload {
  order: string;
  content: string;
  rating: number;
  currentUserId: string;
  userType: string;
}

interface IReviewUpdatePayload {
  reviewId: string;
  content: string;
  rating: number;
  currentUserId: string;
  userType: string;
}

interface IReviewQuery {
  product: string;
  limit: number;
  page: number;
  rating: number;
  currentUserId: string;
  userType: string;
}

export { IReviewQuery, IReviewCreatePayload, IReviewUpdatePayload };
