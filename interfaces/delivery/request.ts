interface ICalculateFeePayload {
  from_district_id: number;
  service_id: number;
  to_district_id: number;
  to_ward_code: string;
  height: number;
  length: number;
  weight: number;
  width: number;
  insurance_value: number;
}

interface IServicePayload {
  from_district: 1447;
  to_district: 1442;
}

export { ICalculateFeePayload, IServicePayload };
