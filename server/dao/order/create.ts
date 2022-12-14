import { Order } from "../../../modules/database/entities";
import database from "../../../modules/database";

export default async (order: Order): Promise<Error | null> => {
  const b = await database.getDataSource();

  try {
    await b.manager.save(order);

    return null;
  } catch (err: unknown) {
    console.log("*** Error when create order:", err);
    return err as Error;
  }
};
