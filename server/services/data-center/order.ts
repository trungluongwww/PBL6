import constants from "../../../constants";
import times from "../../../ultilities/times";
import dao from "../../dao";
import {
  IOrderDataCenterQuery,
  IOrderDataCenterResponse,
  IOrderDataResponse,
  IChartResponse,
  IDataChartResponse,
} from "../../../interfaces/data-center/order";
import money from "../../../ultilities/strings/money";

const getCommonDatacenter = async (
  query: IOrderDataCenterQuery
): Promise<[IOrderDataCenterResponse | null, Error | null]> => {
  // check data type
  if (!constants.dataCenter.all.includes(query.dataType)) {
    return [null, Error("data type không hợp lệ")];
  }

  let result = [] as Array<IOrderDataResponse>;

  const selectedDate = new Date(query.selectedDate);
  const [start, end] = getStartEndTime(
    query.dataType,
    selectedDate,
    query.numOfLastDays
  );

  let [orders, err1] = await dao.order.find.byShopIdAndTime(
    query.shopId,
    start,
    end
  );
  if (err1 || !orders ) {
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


  // data sales chart
  let dataChart = [] as Array<IDataChartResponse>;

  if(orders.length){
    let tempDate = orders[0].createdAt.toISOString().split("T")[0];
    let totalValue = 0;
    orders.forEach((order) => {
      if (order.createdAt.toISOString().startsWith(tempDate)) {
        totalValue += order.total;
      } else {
        dataChart.push({
          name: tempDate,
          value: totalValue,
        });
        totalValue = order.total;
        tempDate = order.createdAt.toISOString().split("T")[0];
      }

      if (order.status == constants.order.status.completed) com += 1;
      if (order.status == constants.order.status.cancelled) can += 1;
      total += order.total;
    });
    dataChart.push({
      name: tempDate,
      value: totalValue,
    });
  }



  let totalRating = 0;

  if(reviews.length){
    reviews.forEach((rv) => {
      totalRating += rv.rating;
    });
    totalRating = (totalRating / reviews.length)
  }

  let percentCancel = (Math.round((can / orders.length) * 10000)/100) || 0

  appendResult(result, "doanh số bán hàng", money.convertToMoneyString(total));
  appendResult(result, "tổng số đơn hàng", orders.length.toString());
  appendResult(result, "số đơn hủy", can.toString());
  appendResult(result, "số đơn hoàn thành", com.toString());
  appendResult(result, "số lượt đánh giá", reviews.length.toString());
  appendResult(
    result,
    "trung bình điểm đánh giá",
    totalRating.toString() + "⭐"
  );
  appendResult(
    result,
    "tỉ lệ hủy đơn",
      percentCancel.toString() + " %"
  );

  const response = {
    charts: {
      name: "Biểu đồ doanh số bán hàng",
      data: dataChart,
    },
    data: result,
    fromDate: new Date(start),
    toDate: new Date(end),
  } as IOrderDataCenterResponse;

  return [response, null];
};

const appendResult = (
  arr: Array<IOrderDataResponse>,
  name: string,
  value: string,
  info: string = ""
) => {
  arr.push({
    info: info,
    name: name,
    value: value,
  });
};

const getStartEndTime = (
  dataType: string,
  date: Date,
  n: number
): [number, number] => {
  let start: Date, end: Date;

  switch (dataType) {
    case constants.dataCenter.typeData.last7Days:
      [start, end] = times.getStartEndLastDays(new Date(), 7);
      break;
    case constants.dataCenter.typeData.last30Days:
      [start, end] = times.getStartEndLastDays(new Date(), 30);
      break;
    case constants.dataCenter.typeData.byWeek:
      [start, end] = times.getStartEndOfWeek(date);
      break;
    case constants.dataCenter.typeData.byMonth:
      [start, end] = times.getStartEndOfMonth(date);
      break;
    default:
      [start, end] = times.getTimeStartEndOfDay(new Date());
      break;
  }

  return [Date.parse(start.toString()), Date.parse(end.toString())];
};

export default {
  getCommonDatacenter,
};
