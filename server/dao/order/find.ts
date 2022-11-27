import { Order } from "../../../modules/database/entities";
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
      "as.avatar",
      "oap.id",
      "oap.quantity",
      "oap.product",
      "p.id",
      "p.name",
      "p.description",
      "p.price",
      "p.avatar",
      "p.discount",
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
  userType: string,
  shopId: string | null
): Promise<[Array<Order> | null, number, Error | null]> => {
  console.log(limit,skip,status,currentUserId,userType,shopId)
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
      "o.reasonCancel",
      "as.id",
      "as.avatar",
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

    if (shopId&&shopId!="") {
      q.where("o.shopId = :shopId", { shopId: shopId });
    }

    if (status) {
      q.andWhere("o.status = :status", { status });
    }

    const count = await q.getCount();

    const rs = await q
      .orderBy("o.updatedAt", "ASC")
      .skip(skip)
      .take(limit)
      .getMany();

    return [rs, count, null];
  } catch (err) {
    console.log("*** Error when load order page");
    return [null, 1, err as Error];
  }
};

const byShopIdAndTime = async (
  shopId: string,
  start: number,
  end: number
): Promise<[Array<Order> | null, Error | null]> => {
  const db = database.getDataSource();
  try {
    const q = db.createQueryBuilder(Order, "o");
    q.where("o.shopId = shopId", { shopId });
    q.where("o.createdAtNumber BETWEEN :start AND :end", { start, end });
    q.select([
      "o.id",
      "o.shopId",
      "o.customerId",
      "o.status",
      "o.total",
      "o.productIds",
      "o.createdAt",
    ]);

    const rs = await q.orderBy("o.createdAt", "ASC").getMany();

    return [rs, null];
  } catch (err: unknown) {
    console.log("***Error when find order by shop id", err);
    return [null, err as Error];
  }
};

export default {
  detailById,
  pageByUser,
  byId,
  byShopIdAndTime,
};
