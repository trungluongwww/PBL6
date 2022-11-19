import database from "../../../modules/database";
import {
  Order,
  OrderAndProduct,
  Product,
} from "../../../modules/database/entities";
import { QueryRunner } from "typeorm";
import { IOrderItemPayload } from "../../../interfaces/order";

export default async (
  order: Order,
  items: Array<IOrderItemPayload>
): Promise<Error | null> => {
  const db = database.getDataSource();
  const queryRunner = db.createQueryRunner();

  await queryRunner.startTransaction();

  try {
    // create
    await insertOrder(queryRunner, order);

    // convert to model oap
    const oaps = items.map((item) => {
      const order = new Order();
      order.id = order.id;
      const product = new Product();
      product.id = item.product_id;

      const oap = new OrderAndProduct();
      oap.order = order;
      oap.orderId = order.id;
      oap.product = product;
      oap.productId = product.id;
      oap.quantity = item.quantity;
      return oap;
    });
    await insertOrderAndProducts(queryRunner, order.id, oaps);

    // commit transaction
    await queryRunner.commitTransaction();

    return null;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.log("[Error] transaction error when create new order");
    return Error("Error when create new order");
  } finally {
    await queryRunner.release();
  }
};

const insertOrder = async (q: QueryRunner, order: Order) => {
  await q.manager.save(order);
};

const insertOrderAndProducts = async (
  q: QueryRunner,
  orderId: string,
  oaps: Array<OrderAndProduct>
) => {
  await q.manager
    .createQueryBuilder()
    .insert()
    .into(OrderAndProduct)
    .values(oaps)
    .execute();
};
