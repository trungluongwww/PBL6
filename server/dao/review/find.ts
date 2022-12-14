import { Review } from "../../../modules/database/entities";
import database from "../../../modules/database";

const pageByProductId = async (
  productId: string,
  limit: number,
  skip: number,
  rating: number
): Promise<[Array<Review>, number, Error | null]> => {
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

    const count = await q.getCount();

    return [await q.take(limit).skip(skip).getMany(), count, null];
  } catch (err: unknown) {
    console.log("Error find review", err);
    return [[], 1, err as Error];
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

const infoReviewByProductId = async (
  productId: string
): Promise<[number, number]> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(Review, "rv");

    q.where(":productId = ANY(rv.productIds)", { productId });

    const count = await q.getCount();

    const avg = await q.select("AVG(rv.rating)", "avg").getRawOne();

    return [count, avg["avg"]];
  } catch (err: unknown) {
    console.log("Error find review", err);
    return [0, 0];
  }
};

const byShopId = async (
  shopId: string,
  start: number,
  end: number
): Promise<[Array<Review> | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(Review, "rv");

    q.leftJoinAndMapOne("rv.order", "orders", "o", "rv.orderId = o.id");

    q.where("o.shopId = :shopId", { shopId });

    q.andWhere("rv.createdAtNumber BETWEEN :start AND :end", { start, end });

    q.select("rv");

    return [await q.getMany(), null];
  } catch (err: unknown) {
    console.log("Error find review", err);
    return [null, err as Error];
  }
};

export default {
  pageByProductId,
  byOrderId,
  byId,
  infoReviewByProductId,
  byShopId,
};
