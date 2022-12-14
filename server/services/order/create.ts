import {
  IOrderCreatePayload,
  IOrderItemPayload,
} from "../../../interfaces/order";
import { Order } from "../../../modules/database/entities";
import services from "../index";
import constants from "../../../constants";
import delivery from "../../../modules/delivery";
import rabbitmq from "../../../modules/rabbitmq";
import email from "../../../modules/email";
import transaction from "../../transaction";

export default async (payload: IOrderCreatePayload): Promise<Error | null> => {
  const productIds = payload.items.map((item) => item.product_id);
  const [customer, e] = await services.account.find.byId(payload.customerId);
  if (e || !customer) {
    return Error("account not found");
  }

  let [orderInfo, err] = await services.product.calculator.infoOrder(
    payload.items,
    payload.shopId
  );

  if (err || !orderInfo) {
    return err;
  }

  let [shop, _] = await services.account.find.byId(payload.shopId);

  if (!shop) {
    return Error("Invalid shop id");
  }

  if (shop.id == customer.id) {
    return Error("Không thể mua hàng của chính bạn");
  }

  const order = new Order();
  order.customerId = payload.customerId;
  order.shopId = payload.shopId;
  order.address = payload.address;
  order.toName = customer.name;
  order.toPhone = customer.phone;
  order.toStreet = customer.address;
  order.toWardCode = customer.wardCode;
  order.toDistrictId = customer.districtId;
  order.serviceId = payload.serviceId;
  order.voucherId = payload.voucherId;
  order.productIds = productIds;
  order.totalPrice = orderInfo.insurance_value;
  order.productDiscount = orderInfo.discount;
  order.status = constants.order.status.waitForConfirm;
  order.paymentMethod = constants.order.paymentMethod.cod;
  order.paymentName = constants.order.paymentMethod.codName;

  if (payload.voucherId) {
    const [voucher, _] = await services.voucher.find.validById(
      payload.voucherId
    );
    if (!voucher) {
      return Error("Voucher not found");
    }
    if (voucher.discountPercent) {
      order.voucherDiscount =
        (order.totalPrice - order.productDiscount) * voucher.discountPercent;
    } else {
      order.voucherDiscount = voucher.discountValue;
    }
  }

  {
    const [feeData, err] = await delivery.shippingOrder.calculateFee(
      {
        items: payload.items,
        service_id: payload.serviceId,
        to_ward_code: customer.wardCode,
        to_district_id: customer.districtId,
        from_district_id: shop.districtId,
      },
      orderInfo
    );
    if (err) {
      return err;
    }

    order.deliveryFee = feeData?.total || 0;
  }

  err = await transaction.order.create(order, payload.items);

  if (err) {
    return err;
  }

  if (customer.email) {
    email.order.createOrder(customer.email, order.total);
  }
  publicChangeProductQuantity(payload.items).then();
  return null;
};

const publicChangeProductQuantity = async (items: Array<IOrderItemPayload>) => {
  rabbitmq.pub.Public(constants.rabbit.decreaseQuantityProductEvent, items);
};

export {
  publicChangeProductQuantity,
}