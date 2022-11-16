import database from "../../../modules/database";
import { Voucher } from "../../../modules/database/entities";

const byId = async (id: string): Promise<Error | null> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(Voucher, "v");
    await q.where("v.id =:id", { id }).delete().execute();
    return null;
  } catch (err: unknown) {
    console.log("Error when delete voucher");
    return err as Error;
  }
};

export default {
  byId,
};
