import constants from "../../../constants";
import times from "../../../ultilities/times";
import dao from "../../dao";
import {
  IOrderDataCenterQuery,
  IOrderDataCenterResponse,
} from "../../../interfaces/data-center/order";

const getCommonDatacenter = async (
  query: IOrderDataCenterQuery
): Promise<[IOrderDataCenterResponse | null, Error | null]> => {
  // check data type
  if (!constants.dataCenter.all.includes(query.dataType)) {
    return [null, Error("data type không hợp lệ")];
  }
  const selectedDate = new Date(query.selectedDate);
  const [start, end] = getStartEndTime(
    query.dataType,
    selectedDate,
    query.numOfLastDays
  );

  let [orders, err1] = await dao.order.find.byShopId(query.shopId, start, end);
  if (err1 || !orders) {
    return [null, err1];
  }

  let [reviews, err2] = await dao.review.find.byShopId(
    query.shopId,
    start,
    end
  );
  if (err2 || !reviews) {
    return [null, err2];
  }

  let com = 0,
    can = 0,
    total = 0;

  orders.forEach((order) => {
    if (order.status == constants.order.status.completed) com += 1;
    if (order.status == constants.order.status.cancelled) can += 1;
    total += order.total;
  });

  let totalRating = 0;
  reviews.forEach((rv) => {
    totalRating += rv.rating;
  });

  return [
    {
      numOfOrder: orders.length,
      numOfCancelledOrder: can,
      numOfCompletedOrder: com,
      numOfReview: reviews.length,
      avegageRating: totalRating / reviews.length,
      sales: total,
    } as IOrderDataCenterResponse,
    null,
  ];
};

const getStartEndTime = (
  dataType: string,
  date: Date,
  n: number
): [number, number] => {
  let start: Date, end: Date;
  switch (dataType) {
    case constants.dataCenter.typeData.last7Days:
      [start, end] = times.getStartEndLastDays(date, 7);
      break;
    case constants.dataCenter.typeData.last30Days:
      [start, end] = times.getStartEndLastDays(date, 30);
      break;
    case constants.dataCenter.typeData.byWeek:
      [start, end] = times.getStartEndOfWeek(date);
      break;
    case constants.dataCenter.typeData.byMonth:
      [start, end] = times.getStartEndOfMonth(date);
      break;
    default:
      [start, end] = times.getTimeStartEndOfDay(date);
      break;
  }

  return [Date.parse(start.toString()), Date.parse(end.toString())];
};

export default {
  getCommonDatacenter,
};
