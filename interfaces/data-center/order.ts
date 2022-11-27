interface IOrderDataCenterQuery {
  dataType: string;
  selectedDate: string;
  shopId: string;
  numOfLastDays: number;
}

interface IOrderDataCenterResponse {
  data: Array<IOrderDataResponse>;
  charts: IChartResponse;
  fromDate: Date;
  toDate: Date;
}

interface IChartResponse {
  name: string;
  data: Array<IDataChartResponse>;
}

interface IDataChartResponse {
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
  IDataChartResponse,
  IChartResponse,
};
