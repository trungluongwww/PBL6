import {
  IOrderDeletePayload,
  IOrderDetailQuery,
  IOrderQuerySearchByUser,
  IOrderUpdateStatusPayload,
} from "../../../interfaces/order";

import constants from "../../../constants";
import dao from "../../dao";
import strings from "../../../ultilities/strings";

export default async (payload: IOrderDeletePayload): Promise<Error | null> => {
  const [order, _] = await dao.order.find.byId(
    payload.orderId,
    payload.typeUser
  );
  if (!order?.id) {
    return Error("Bad request");
  }

  if (!strings.array.include(constants.account.role.all, payload.typeUser)) {
    return Error("No permission");
  }

  if (
    order.customerId != payload.currentUserId &&
    order.shopId != payload.currentUserId
  ) {
    return Error("No permission");
  }

  if (!strings.array.include(constants.order.allowDelete, order.status)) {
    return Error("Cannot be delete");
  }

  const err = await dao.order.del(order.id, payload.typeUser);
  if (err) {
    return Error("Bad request");
  }

  return null;
};
