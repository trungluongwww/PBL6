import { IOrderItemPayload } from "../order";

interface IDeliveryPreviewFeePayload {
  from_district_id: number;
  service_id: number;
  to_district_id: number;
  to_ward_code: string;
  items: Array<IOrderItemPayload>;
}

interface IGHNFeePayload {
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

interface IGHNServicePayload {
  from_district: number;
  to_district: number;
}

export { IDeliveryPreviewFeePayload, IGHNServicePayload, IGHNFeePayload };
