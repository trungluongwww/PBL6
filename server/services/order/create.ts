import { IOrderCreatePayload } from "../../../interfaces/order";
import { Order } from "../../../modules/database/entities";
import services from "../index";
import constants from "../../../constants";
import dao from "../../dao";
import redis from "../../../modules/redis";
import delivery from "../../../modules/delivery";
import {
  ICalculateFeePayload,
  IServicePayload,
} from "../../../interfaces/delivery/request";
const one = async (payload: IOrderCreatePayload): Promise<Error | null> => {
  const productIds = payload.items.map((item) => item.productId);
  const [total, err] =
    await services.product.calculatorTotal.totalPriceAndVolumn(payload.items);
  if (err || !total) {
    return err;
  }
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
  order.totalPrice = total;
  order.status = constants.order.status.waitingVerify;
  const [rs, err2] = await dao.order.create(order);
  if (err2 || !rs) {
    return err2;
  }
  const err3 = await services.orderAndProduct.create.many(rs.id, payload.items);
  if (err3) {
    return err3;
  }

  return null;
};

export default {
  one,
};
