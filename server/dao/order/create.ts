import { Order } from "../../../modules/database/entities";
import database from "../../../modules/database";
export default async (order: Order): Promise<[Order | null, Error | null]> => {
  const b = await database.getDataSource();
  try {
    const rs = await b.manager.save(order);
    return [rs, null];
  } catch (err: unknown) {
    console.log("*** Error when create order:", err);
    return [null, err as Error];
  }
};
