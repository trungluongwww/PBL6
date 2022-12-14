import database from "../../../modules/database";
import { Product } from "../../../modules/database/entities";

export default async (p: Product): Promise<Error | null> => {
  const db = database.getDataSource();

  try {
    await db.manager.save(p);

    return null;
  } catch (err: any) {
    console.log(`[Error] when add product from rabbit ${err.message}`);
    return err as Error;
  }
};
