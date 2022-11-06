import { Review } from "../../../modules/database/entities";
import database from "../../../modules/database";

const pageByProductId = async (
  productId: string,
  limit: number,
  skip: number,
  rating: number
): Promise<[Array<Review>, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(Review, "rv");
    q.leftJoinAndMapOne("rv.customer", "accounts", "a", "rv.customerId = a.id");
    q.select([
      "a.id",
      "a.name",
      "a.avatar",
      "rv.id",
      "rv.updatedAt",
      "rv.content",
      "rv.rating",
    ]);
    q.where(":productId = ANY(rv.productIds)", { productId });

    if (rating) {
      q.andWhere("rv.rating = :rating", { rating });
    }

    return [await q.take(limit).skip(skip).getMany(), null];
  } catch (err: unknown) {
    console.log("Error find review", err);
    return [[], err as Error];
  }
};

const byOrderId = async (
  order: string
): Promise<[Review | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(Review, "rv");
    q.where("rv.orderId = :orderId", { orderId: order });
    q.select(["rv.id", "rv.updatedAt", "rv.content", "rv.rating"]);

    return [await q.getOne(), null];
  } catch (err: unknown) {
    console.log("Error find review", err);
    return [null, err as Error];
  }
};

const byId = async (id: string): Promise<[Review | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(Review, "rv");
    q.where("rv.id = :id", { id });
    q.select("rv");

    return [await q.getOne(), null];
  } catch (err: unknown) {
    console.log("Error find review", err);
    return [null, err as Error];
  }
};

const infoReviewByProductId = async (productId:string):Promise<[number,number]>=>{
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(Review, "rv");
    q.where(":productId = ANY(rv.productIds)", { productId });
    const count =  await q.getCount();
    const ave = await q.select('AVG(rv.rating)', 'avg').getRawOne()
    return [count,ave]

  } catch (err: unknown) {
    console.log("Error find review", err);
    return [0,0];
  }
}



export default {
  pageByProductId,
  byOrderId,
  byId,
  infoReviewByProductId
};
