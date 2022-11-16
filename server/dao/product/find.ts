import database from "../../../modules/database";
import { Product } from "../../../modules/database/entities";

const byIds = async (
  ids: Array<string>
): Promise<[Array<Product> | null, null | Error]> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(Product, "p");
    q.select(["p"]);
    q.where("p.id = ANY(:ids)", { ids });
    return [await q.getMany(), null];
  } catch (err) {
    console.log("*** Error when find product by ids", err);
    return [null, err as Error];
  }
};

export default {
  byIds,
};
