interface ICalculateFeeResponse {
  code: number;
  message: string;
  data: ICalculateFeeData;
}

interface ICalculateFeeData {
  total: number;
  service_fee: number;
  insurance_fee: number;
  pick_station_fee: number;
  coupon_value: number;
  r2s_fee: number;
}

interface IServiceResponse {
  code: number;
  message: string;
  data: [IServiceData] | null;
}

interface IServiceData {
  service_id: number;
  short_name: string;
  service_type_id: number;
}

export {
  ICalculateFeeResponse,
  IServiceResponse,
  ICalculateFeeData,
  IServiceData,
};
