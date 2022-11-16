import { District, Province, Ward } from "../../../modules/database/entities";
import dao from "../../dao";

const getProvinces = async (): Promise<
  [Array<Province> | null, null | Error]
> => {
  return dao.address.getProvinces();
};

const getDistricts = async (
  proId: number
): Promise<[Array<District> | null, null | Error]> => {
  return await dao.address.getDistricts(proId);
};

const getWards = async (
  disId: number
): Promise<[Array<Ward> | null, null | Error]> => {
  return await dao.address.getWards(disId);
};

export default {
  getProvinces,
  getDistricts,
  getWards,
};
