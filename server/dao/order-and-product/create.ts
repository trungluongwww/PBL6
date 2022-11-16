import { OrderAndProduct } from "../../../modules/database/entities";
import database from "../../../modules/database";
import orderAndProduct from "./index";

const one = async (
  oap: OrderAndProduct
): Promise<[OrderAndProduct | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    await db.manager.save(oap);

    return [null, null];
  } catch (err) {
    console.log("*** Error when create oap", err);
    return [null, err as Error];
  }
};

const many = async (
  oaps: Array<OrderAndProduct>
): Promise<[any, Error | null]> => {
  const db = database.getDataSource();

  try {
    await db
      .createQueryBuilder()
      .insert()
      .into(OrderAndProduct)
      .values(oaps)
      .execute();

    return [null, null];
  } catch (err) {
    console.log("*** Error when create mutile oaps", err);
    return [null, err as Error];
  }
};

export default {
  one,
  many,
};
