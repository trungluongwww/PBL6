import {
  INextActionResponse, IOrderCalculatePayload, IOrderCreatePayload,
  IOrderDetailQuery,
  IOrderQuerySearchByUser,
  IOrderSearchResponse,
} from "../../../interfaces/order";
import constants from "../../../constants";
import dao from "../../dao";
import services from "../index";
import delivery from "../../../modules/delivery";

const pageByClientId = async (
  query: IOrderQuerySearchByUser
): Promise<[any | null, Error | null]> => {
  query.limit = query.limit >= 1 ? Math.round(query.limit) : 10;
  query.page = Math.round(query.page);

  let shopId = "";
  if (query.shopId && query.shopId != "") {
    const [account, err] = await services.account.find.byId(query.currentUserId);
    if (err || !account) {
      return [null, Error("shop không tồn tại")];
    }

    if (account.role != constants.account.role.admin) {
      return [null, Error("account không phải admin")];
    }
    shopId = query.shopId;
  }

  let skip = query.page >= 1 ? (query.page - 1) * query.limit : 0;

  if (query.status) {
    if (!constants.order.status.all.includes(query.status)) {
      return [null, Error("Invalid input")];
    }
  } else {
    query.status = null;
  }

  const [orders, count, err] = await dao.order.find.pageByUser(
    query.limit,
    skip,
    query.status,
    query.currentUserId,
    query.userType,
    shopId
  );

  if (err) {
    return [null, err];
  }

  let response: IOrderSearchResponse = {
    orders: [],
    numOfPage: 1,
    nextAction: [],
    page: query.page,
    limit: query.limit,
  };

  if (orders) {
    response.orders = orders;
    response.numOfPage = Math.floor(count / query.limit) + 1;
    response.nextAction = getNextAction(
      query.userType,
      query.status
    ) as Array<INextActionResponse>;
  }

  return [response, null];
};

const byId = async (query: IOrderDetailQuery): Promise<[any, Error | null]> => {
  const [order, err] = await dao.order.find.detailById(query);
  if (err) {
    return [null, err];
  }
  return [order, null];
};

const getNextAction = (role: string, preStatus: string | null): Array<any> => {
  let data: any = [];
  if (role == constants.account.role.shop) {
    switch (preStatus) {
      case constants.order.status.waitForConfirm:
        data = constants.order.configActionStatusShop.waitForConfirm;
        break;
      case constants.order.status.confirmed:
        data = constants.order.configActionStatusShop.confirmed;
        break;
      case constants.order.status.delivering:
        data = constants.order.configActionStatusShop.delivering;
        break;
      default:
        break;
    }
  } else {
    switch (preStatus) {
      case constants.order.status.waitForConfirm:
        data = constants.order.configActionStatusCustomer.waitForConfirm;
        break;
      case constants.order.status.confirmed:
        data = constants.order.configActionStatusCustomer.confirmed;
        break;
      case constants.order.status.delivering:
        data = constants.order.configActionStatusCustomer.delivering;
        break;
      default:
        break;
    }
  }
  return data;
};

export default {
  pageByClientId,
  byId,
};
