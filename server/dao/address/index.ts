import { District, Province, Ward } from "../../../modules/database/entities";
import database from "../../../modules/database";

const getProvinces = async (): Promise<
  [Array<Province> | null, null | Error]
> => {
  const db = database.getDataSource();
  try {
    const q = db.createQueryBuilder(Province, "p");
    return [await q.select(["p"]).getMany(), null];
  } catch (err) {
    return [null, err as Error];
  }
};

const getDistricts = async (
  proId: number
): Promise<[Array<District> | null, null | Error]> => {
  const db = database.getDataSource();
  try {
    const q = db.createQueryBuilder(District, "d");
    q.where("d.provinceId = :id", { id: proId });
    return [await q.select(["d"]).getMany(), null];
  } catch (err) {
    return [null, err as Error];
  }
};

const getWards = async (
  disId: number
): Promise<[Array<Ward> | null, null | Error]> => {
  const db = database.getDataSource();
  try {
    const q = db.createQueryBuilder(Ward, "w");
    q.where("w.districtId = :id", { id: disId });
    return [await q.select(["w"]).getMany(), null];
  } catch (err) {
    return [null, err as Error];
  }
};

export default {
  getProvinces,
  getDistricts,
  getWards,
};
