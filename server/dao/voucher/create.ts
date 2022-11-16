import { Voucher } from "../../../modules/database/entities";
import database from "../../../modules/database";

const create = async (voucher: Voucher): Promise<Error | null> => {
  const db = database.getDataSource();

  try {
    await db.manager.save(voucher);
    return null;
  } catch (err: unknown) {
    const error = err as Error;
    console.log("Error when createVoucher:" + error.message);
    return error;
  }
};

export default create;
