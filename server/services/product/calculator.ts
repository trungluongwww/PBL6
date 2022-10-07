import dao from "../../dao";
import { IOrderItemPayload } from "../../../interfaces/order";
import product from "../../dao/product";

const totalPriceAndVolumn = async (
  orderItems: Array<IOrderItemPayload>
): Promise<[number | null, null | Error]> => {
  const [products, err] = await dao.product.find.byIds(
    orderItems.map((item) => item.productId)
  );

  if (err) {
    return [null, err];
  }

  const objMemo = new Map();
  products?.forEach((product) => {
    objMemo.set(product.id, product.price);
  });
  const total = orderItems.reduce((total, item) => {
    total += item.quantity * objMemo.get(item.productId);
    return total;
  }, 0);

  return [total, null];
};

export default {
  totalPriceAndVolumn,
};
