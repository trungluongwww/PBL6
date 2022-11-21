import { Review } from "../../../modules/database/entities";
import database from "../../../modules/database";

const byId = async (
  id: string,
  content: string,
  rating: number
): Promise<Error | null> => {
  const b = database.getDataSource();

  try {
    await b
      .createQueryBuilder()
      .update(Review)
      .set({
        content: content,
        rating: rating,
      })
      .where("id = :id", { id })
      .execute();
    return null;
  } catch (err: unknown) {
    console.log("*** Error when update review:", err);
    return err as Error;
  }
};

export default {
  byId,
};
