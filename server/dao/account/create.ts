import { Account } from "../../../modules/database/entities";
import database from "../../../modules/database";

export default async (account: Account): Promise<Error | null> => {
  try {
    const db = database.getDataSource();

    await db.manager.save(account);
    return null;
  } catch (err: unknown) {
    console.log("Error when add new account from rabbit");
    return err as Error;
  }
};
