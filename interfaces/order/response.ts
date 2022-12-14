import { Order } from "../../modules/database/entities";

interface IOrderInfo {
  height: number;
  length: number;
  weight: number;
  width: number;
  insurance_value: number;
  discount: number;
}

interface IOrderSearchResponse {
  orders: Array<Order>;
  numOfPage: number;
  page: number;
  limit: number;
  nextAction: Array<INextActionResponse>;
}

interface INextActionResponse {
  id: number;
  name: string;
  value: string;
  isRequireReason: boolean;
  color: string;
}

export { IOrderInfo, IOrderSearchResponse, INextActionResponse };
