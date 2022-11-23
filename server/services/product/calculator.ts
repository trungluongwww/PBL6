import dao from "../../dao";
import { IOrderInfo, IOrderItemPayload } from "../../../interfaces/order";
import { Product } from "../../../modules/database/entities";

const infoOrder = async (
  orderItems: Array<IOrderItemPayload>,
  shopId: string | null
): Promise<[IOrderInfo | null, null | Error]> => {
  const [products, err] = await dao.product.find.byIds(
    orderItems.map((item) => item.product_id)
  );

  if (err) {
    return [null, err];
  }

  const mapProduct = new Map<string, Product>();

  let err2 = null;
  products?.forEach((product) => {
    if (product.shopId != shopId && shopId != null) {
      err2 = Error("product không hợp lệ");
    }
    mapProduct.set(product.id, product);
  });

  if (err2) {
    return [null, err2];
  }

  let totalPrice = 0;
  let discount = 0;
  let sumVolumn = 0;
  let sumWeight = 0;
  for (let i = 0; i < orderItems.length; i++) {
    const product = mapProduct.get(orderItems[i].product_id);

    if (product) {
      if (orderItems[i].quantity > product.quantity || product.quantity < 1) {
        return [null, Error("Invalid quantity")];
      }
      totalPrice += orderItems[i].quantity * product.price;
      sumVolumn +=
        product.height *
        product.width *
        product.length *
        orderItems[i].quantity;
      sumWeight += product.weight * orderItems[i].quantity;
      if (product.discount) {
        discount +=
          (product.price * product.discount * orderItems[i].quantity) / 100;
      }
    }
  }

  let value = Math.round(Math.pow(sumVolumn, 1 / 3));

  return [
    {
      weight: sumWeight,
      insurance_value: totalPrice,
      height: value,
      length: value,
      width: value,
      discount: discount,
    } as IOrderInfo,
    null,
  ];
};

export default {
  infoOrder,
};
