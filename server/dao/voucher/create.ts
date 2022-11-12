import { Voucher } from "../../../modules/database/entities";
import database from "../../../modules/database";

const create = async (voucher: Voucher): Promise<Error | null> => {
  const db = database.getDataSource();
  try {
    await db.manager.save(db);
    return null;
  } catch (err: unknown) {
    console.log("Error when createVoucher:" + err);
    return err as Error;
  }
};

export default create;
