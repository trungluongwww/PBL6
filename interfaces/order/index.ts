interface IOrderCreatePayload {
  clientId: string;
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
  productId: string;
  quantity: number;
}

export { IOrderCreatePayload, IOrderItemPayload };
