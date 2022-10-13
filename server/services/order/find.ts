import {
  IOrderDetailQuery,
  IOrderQuerySearchByUser,
} from "../../../interfaces/order";

import constants from "../../../constants";
import dao from "../../dao";

const pageByClientId = async (
  query: IOrderQuerySearchByUser
): Promise<[Array<any> | null, Error | null]> => {
  query.limit = query.limit >= 1 ? Math.round(query.limit) : 10;

  let skip = query.page >= 1 ? (Math.round(query.page) - 1) * query.limit : 0;

  if (query.status) {
    if (!constants.order.status.all.includes(query.status)) {
      return [null, Error("Invalid input")];
    }
  } else {
    query.status = null;
  }
  const [orders, err] = await dao.order.find.pageByUser(
    query.limit,
    skip,
    query.status,
    query.currentUserId,
    query.userType
  );

  if (err) {
    return [null, err];
  }
  return [orders, null];
};

const byId = async (query: IOrderDetailQuery): Promise<[any, Error | null]> => {
  const [order, err] = await dao.order.find.byId(query);
  if (err) {
    return [null, err];
  }
  return [order, null];
};

export default {
  pageByClientId,
  byId,
};
