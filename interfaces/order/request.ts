interface IOrderCreatePayload {
  customerId: string;
  shopId: string;
  address: string;
  toName: string;
  toPhone: string;
  toStreet: string;
  toWardCode: string;
  toDistrictId: number;
  serviceId: number;
  voucherId: string;
  items: Array<IOrderItemPayload>;
}

interface IOrderItemPayload {
  product_id: string;
  quantity: number;
}

interface IOrderQuerySearchByUser {
  page: number;
  limit: number;
  status: string | null;
  currentUserId: string;
  userType: string;
}

interface IOrderDetailQuery {
  currentUserId: string;
  userType: string;
  orderId: string;
}

interface IOrderUpdateStatusPayload {
  status: string;
  orderId: string;
  currentUserId: string;
  userType: string;
}

interface IOrderDeletePayload {
  currentUserId: string;
  typeUser: string;
  orderId: string;
}

export {
  IOrderCreatePayload,
  IOrderItemPayload,
  IOrderQuerySearchByUser,
  IOrderDetailQuery,
  IOrderUpdateStatusPayload,
  IOrderDeletePayload,
};
