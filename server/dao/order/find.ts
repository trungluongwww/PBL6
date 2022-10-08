import { Order } from "../../../modules/database/entities";
import database from "../../../modules/database";

const byId = async (id: string): Promise<[Order | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = await db.createQueryBuilder(Order, "o");
    q.leftJoinAndMapOne("o.client", "accounts", "ac", "ac.id = o.clientId");
    q.leftJoinAndMapOne("o.shop", "accounts", "ash", "ash.id = o.shopId");
    q.select(["o", "ac", "ash"]);

    // q.where("o.id = :id", { id });
    const rs = await q.getOne();
    console.log(rs);
    return [rs as Order, null];
  } catch (err: unknown) {
    console.log("***Error when find order", err);
    return [null, err as Error];
  }
};

export default {
  byId,
};
