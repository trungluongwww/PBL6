interface IGHNPreviewFeeResponse {
  code: number;
  message: string;
  data: IGHNPreviewFeeData;
}

interface IGHNPreviewFeeData {
  total: number;
  service_fee: number;
  insurance_fee: number;
  pick_station_fee: number;
  coupon_value: number;
  r2s_fee: number;
}

interface IGHNServiceResponse {
  code: number;
  message: string;
  data: [IGHNServiceData] | null;
}

interface IGHNServiceData {
  service_id: number;
  short_name: string;
  service_type_id: number;
}

export {
  IGHNPreviewFeeResponse,
  IGHNServiceResponse,
  IGHNPreviewFeeData,
  IGHNServiceData,
};
