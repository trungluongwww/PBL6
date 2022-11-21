import { Order } from "../../../modules/database/entities";
import database from "../../../modules/database";

const status = async (
  id: string,
  status: string,
  reason: string
): Promise<Error | null> => {
  const db = database.getDataSource();

  try {
    await db
      .createQueryBuilder()
      .update(Order)
      .set({
        status: status,
        reasonCancel: reason,
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
