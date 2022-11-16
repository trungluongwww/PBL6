import { Account, Order } from "../../../modules/database/entities";
import database from "../../../modules/database";

import { IOrderUpdateStatusPayload } from "../../../interfaces/order";

const status = async (id: string, status: string): Promise<Error | null> => {
  const db = database.getDataSource();

  try {
    await db
      .createQueryBuilder()
      .update(Order)
      .set({
        status: status,
      })
      .where("id =:id", { id })
      .execute();
    return null;
  } catch (err: unknown) {
    console.log("*** Error when update order:", err);
    return err as Error;
  }
};

export default {
  status,
};
