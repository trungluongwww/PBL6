import { Account } from "../../../modules/database/entities";
import database from "../../../modules/database";

const byId = async (id: string): Promise<[Account | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db
      .createQueryBuilder(Account, "a")
      .select(["a"])
      .where("a.id = :id", { id });

    return [await q.getOne(), null];
  } catch (err: unknown) {
    console.log("*** Error when get account");
    return [null, err as Error];
  }
};

export default {
  byId,
};
