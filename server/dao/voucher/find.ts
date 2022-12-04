import { Voucher } from "../../../modules/database/entities";
import database from "../../../modules/database";

const validById = async (
  id: string
): Promise<[Voucher | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(Voucher, "v");
    q.select(["v.discountPercent", "v.discountValue", "v.id"]);
    q.where("v.id = :id", { id });
    q.andWhere("v.is_delete = false AND v.is_active = true");
    q.andWhere("v.quantity > 0");

    const rs = await q.getOne();
    return [rs, null];
  } catch (err: unknown) {
    console.log("*** Error when get voucher", err);
    return [null, err as Error];
  }
};

const validByCode = async (
  code: string
): Promise<[Voucher | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(Voucher, "v");
    q.select(["v.id"]);
    q.where("v.code = :code", { code:code });

    const rs = await q.getOne();

    return [rs, null];
  } catch (err: unknown) {
    console.log("*** Error when valid code voucher", err);
    return [null, err as Error];
  }
};

const active = async (): Promise<[Array<Voucher>, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(Voucher, "v");
    q.select([
      "v.id",
      "v.name",
      "v.description",
      "v.code",
      "v.discountPercent",
      "v.discountValue",
      "v.quantity",
        "v.isActive"
    ]);
    q.where("v.isActive = :status", { status: true });

    const rs = await q.getMany();

    return [rs, null];
  } catch (err: unknown) {
    console.log("*** Error when valid code voucher", err);
    return [[], err as Error];
  }
};

const byId = async (id: string): Promise<[Voucher | null, Error | null]> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder(Voucher, "v");
    q.where("v.id = :id", { id });
    q.select("v");
    const rs = await q.getOne();
    return [rs, null];
  } catch (err: unknown) {
    console.log("[Error] Error when get voucher", err);
    return [null, err as Error];
  }
};

export default {
  validById,
  validByCode,
  active,
  byId,
};
