import { Account, Order } from "../../../modules/database/entities";
import database from "../../../modules/database";
import constants from "../../../constants";
import { IOrderDetailQuery } from "../../../interfaces/order";

const detailById = async (
  query: IOrderDetailQuery
): Promise<[Order | null, Error | null]> => {
  const db = database.getDataSource();
  try {
    const q = db.createQueryBuilder(Order, "o");
    q.leftJoinAndMapOne("o.customer", "accounts", "ac", "ac.id = o.customerId");
    q.leftJoinAndMapOne("o.shop", "accounts", "as", "as.id = o.shopId");
    q.leftJoinAndMapMany(
      "o.items",
      "order_and_products",
      "oap",
      "o.id = oap.orderId"
    );
    q.leftJoinAndMapOne("oap.product", "products", "p", "oap.productId = p.id");
    q.select([
      "o.createdAt",
      "o.updatedAt",
      "o.address",
      "o.totalDiscount",
      "o.productDiscount",
      "o.voucherDiscount",
      "o.totalPrice",
      "o.deliveryFee",
      "o.total",
      "o.status",
      "ac.id",
      "ac.name",
      "ac.phone",
      "ac.email",
      "as.id",
      "as.name",
      "as.phone",
      "as.email",
      "oap.id",
      "oap.quantity",
      "oap.product",
      "p.id",
      "p.name",
      "p.description",
      "p.price",
      "p.avatar",
    ]);
    if (query.userType == constants.account.role.customer) {
      q.where("o.customerId = :id", { id: query.currentUserId });
    }
    if (query.userType == constants.account.role.shop) {
      q.where("o.shopId = :id", { id: query.currentUserId });
    }
    q.andWhere("o.id = :orderId", { orderId: query.orderId });
    const rs = await q.getOne();

    return [rs as Order, null];
  } catch (err: unknown) {
    console.log("***Error when find order", err);
    return [null, err as Error];
  }
};

const byId = async (
  id: string,
  typeUser: string
): Promise<[Order | null, Error | null]> => {
  const db = database.getDataSource();
  try {
    const q = db.createQueryBuilder(Order, "o");
    q.select([
      "o.id",
      "o.shopId",
      "o.customerId",
      "o.status",
      "o.total",
      "o.productIds",
    ]);

    if (typeUser == constants.account.role.shop) {
      q.where("o.isCustomerDeleted = false AND o.id = :id", { id });
    } else {
      q.where("o.isShopDeleted = false AND o.id = :id", { id });
    }

    const rs = await q.getOne();

    return [rs as Order, null];
  } catch (err: unknown) {
    console.log("***Error when find order", err);
    return [null, err as Error];
  }
};

const pageByUser = async (
  limit: number,
  skip: number,
  status: string | null,
  currentUserId: string,
  userType: string
): Promise<[Array<Order> | null, Error | null]> => {
  const db = database.getDataSource();
  try {
    const q = db.createQueryBuilder(Order, "o");
    q.leftJoinAndMapOne("o.shop", "accounts", "as", "as.id = o.shopId");
    q.leftJoinAndMapMany(
      "o.items",
      "order_and_products",
      "oap",
      "o.id = oap.orderId"
    );
    q.leftJoinAndMapOne("oap.product", "products", "p", "oap.productId = p.id");
    q.select([
      "o.id",
      "o.status",
      "o.total",
      "o.createdAt",
      "o.updatedAt",
      "as.id",
      "as.name",
      "oap.id",
      "oap.quantity",
      "oap.product",
      "p.id",
      "p.name",
      "p.description",
      "p.price",
      "p.avatar",
    ]);
    if (userType == constants.account.role.customer) {
      q.where("o.isCustomerDeleted = false AND o.customerId = :id", {
        id: currentUserId,
      });
    }
    if (userType == constants.account.role.shop) {
      q.where("o.isShopDeleted = false AND o.shopId = :id", {
        id: currentUserId,
      });
    }

    if (status) {
      q.andWhere("o.status = :status", { status });
    }
    const rs = await q
      .orderBy("o.updatedAt", "DESC")
      .skip(skip)
      .take(limit)
      .getMany();

    return [rs, null];
  } catch (err) {
    console.log("*** Error when load order page");
    return [null, err as Error];
  }
};

export default {
  detailById,
  pageByUser,
  byId,
};
