import { Account } from "../../../modules/database/entities";
import database from "../../../modules/database";

export default async (account: Account): Promise<Error | null> => {
  try {
    const db = database.getDataSource();

    await db.manager.save(account);
    return null;
  } catch (err: unknown) {
    const Err = err as Error;
    console.log("[Rabbit Error] when add new account from rabbit", Err.message);
    return Err;
  }
};
