import { Review } from "../../../modules/database/entities";
import database from "../../../modules/database";

export default async (review: Review): Promise<Error | null> => {
  const b = database.getDataSource();

  try {
    await b.manager.save(review);

    return null;
  } catch (err: unknown) {
    console.log("*** Error when create review:", err);
    return err as Error;
  }
};
