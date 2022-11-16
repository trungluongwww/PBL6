import { Voucher } from "../../../modules/database/entities";
import database from "../../../modules/database";

const byId = async (voucher: Voucher): Promise<Error | null> => {
  const db = database.getDataSource();

  try {
    await db.manager.save(voucher);
    return null;
  } catch (err: unknown) {
    const error = err as Error;
    console.log("[Error] Error when update voucher:" + error.message);
    return error;
  }
};

export default {
  byId,
};
