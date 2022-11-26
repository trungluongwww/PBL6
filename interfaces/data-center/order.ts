interface IOrderDataCenterQuery {
  dataType: string;
  selectedDate: string;
  shopId: string;
  numOfLastDays: number;
}

interface IOrderDataCenterResponse {
  data: Array<IOrderDataResponse>;
  charts: Array<IOrderDataChartResponse>;
  fromDate: Date;
  toDate: Date;
}

interface IOrderDataChartResponse {
  name: string;
  value: number;
}

interface IOrderDataResponse {
  name: string;
  info: string;
  value: string;
}

export {
  IOrderDataCenterResponse,
  IOrderDataCenterQuery,
  IOrderDataResponse,
  IOrderDataChartResponse,
};
