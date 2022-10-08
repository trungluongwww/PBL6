import { IOrderCreatePayload } from "../../../interfaces/order";
import { Order } from "../../../modules/database/entities";
import services from "../index";
import constants from "../../../constants";
import dao from "../../dao";
import delivery from "../../../modules/delivery";

export default async (payload: IOrderCreatePayload): Promise<Error | null> => {
  const productIds = payload.items.map((item) => item.product_id);

  let [orderInfo, err] = await services.product.calculator.infoOrder(
    payload.items
  );
  console.log(orderInfo, err);
  if (err || !orderInfo) {
    return err;
  }

  let [shop, _] = await services.account.find.byId(payload.shopId);

  if (!shop) {
    console.log(shop, _);
    return Error("Invalid shop id");
  }

  console.log("pass 1");
  const order = new Order();
  order.clientId = payload.clientId;
  order.shopId = payload.shopId;
  order.address = payload.address;
  order.toName = payload.toName;
  order.toPhone = payload.toPhone;
  order.toStreet = payload.toStreet;
  order.toWardCode = payload.toWardCode;
  order.toDistrictId = payload.toDistrictId;
  order.serviceId = payload.serviceId;
  order.voucherId = payload.voucherId;
  order.productIds = productIds;
  order.totalPrice = orderInfo.insurance_value;
  order.productDiscount = orderInfo.discount;
  order.status = constants.order.status.waitingVerify;
  console.log("pass 2");

  if (payload.voucherId) {
    const [voucher, _] = await services.voucher.find.validById(
      payload.voucherId
    );
    if (!voucher) {
      return Error("Voucher not found");
    }
    if (voucher.discountPercent) {
      order.voucherDiscount =
        ((order.totalPrice - order.productDiscount) * voucher.discountPercent) /
        100;
      console.log(
        order.voucherDiscount,
        order.totalPrice,
        order.productDiscount,
        voucher.discountPercent
      );
    } else {
      order.voucherDiscount = voucher.discountValue;
    }
  }
  console.log("pass 3");

  {
    const [feeData, err] = await delivery.shippingOrder.calculateFee(
      {
        items: payload.items,
        service_id: payload.serviceId,
        to_ward_code: payload.toWardCode,
        to_district_id: payload.toDistrictId,
        from_district_id: shop.districtId,
      },
      orderInfo
    );
    if (err) {
      return err;
    }

    order.deliveryFee = feeData?.total || 0;
  }
  console.log("pass 4");
  err = await dao.order.create(order);
  console.log("pass 5");
  if (err) {
    return err;
  }

  err = await services.orderAndProduct.create.many(order.id, payload.items);
  if (err) {
    return err;
  }
  console.log("pass 6");
  return null;
};
