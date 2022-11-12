import database from "../../../modules/database";
import { Review } from "../../../modules/database/entities";

const byId = async (id: string): Promise<Error | null> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(Review, "r");
    await q
      .where("r.id =:id", { id })
      .update({
        isDeleted: true,
      })
      .execute();
    return null;
  } catch (err: unknown) {
    console.log("Error when delete review");
    return err as Error;
  }
};

export default {
  byId,
};
