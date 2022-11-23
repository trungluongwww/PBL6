interface IOrderDataCenterQuery {
  dataType: string;
  selectedDate: string;
  shopId: string;
  numOfLastDays: number;
}

interface IOrderDataCenterResponse {
  numOfOrder: number;
  numOfCompletedOrder: number;
  numOfCancelledOrder: number;
  numOfReview: number;
  avegageRating: number;
  sales: number;
}

export { IOrderDataCenterResponse, IOrderDataCenterQuery };
