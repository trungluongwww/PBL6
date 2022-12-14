import database from "../../../modules/database";
import {
  Order,
  OrderAndProduct,
  Product,
} from "../../../modules/database/entities";
import dao from "../../dao";
import { IOrderItemPayload } from "../../../interfaces/order";

const one = async (
  orderId: string,
  productId: string,
  quantity: number
): Promise<null | Error> => {
  const order = new Order();
  order.id = orderId;
  const product = new Product();
  product.id = productId;

  const oap = new OrderAndProduct();
  oap.order = order;
  oap.orderId = orderId;
  oap.product = product;
  oap.productId = productId;
  oap.quantity = quantity;

  const [_, err] = await dao.orderAndProduct.create.one(oap);
  if (err) {
    return err;
  }
  return null;
};

const many = async (
  orderId: string,
  orderItems: Array<IOrderItemPayload>
): Promise<Error | null> => {
  const oaps = orderItems.map((item) => {
    const order = new Order();
    order.id = orderId;
    const product = new Product();
    product.id = item.product_id;

    const oap = new OrderAndProduct();
    oap.order = order;
    oap.orderId = orderId;
    oap.product = product;
    oap.productId = product.id;
    oap.quantity = item.quantity;
    return oap;
  });

  const [_, err] = await dao.orderAndProduct.create.many(oaps);
  if (err) {
    return err;
  }
  return null;
};

export default {
  one,
  many,
};
