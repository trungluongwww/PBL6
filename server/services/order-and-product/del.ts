import database from "../../../modules/database";
import { OrderAndProduct } from "../../../modules/database/entities";

const manyByOrderId = async (orderId: string): Promise<Error | null> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(OrderAndProduct, "op");
    q.where("op.orderId");
    q.delete();
    await q.execute();
    return null;
  } catch (err: any) {
    return err as Error;
  }
};
export default {
  manyByOrderId,
};
