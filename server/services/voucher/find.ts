import { IVoucherDetail } from "../../../interfaces/voucher";
import dao from "../../dao";

const validById = async (
  id: string
): Promise<[IVoucherDetail | null, Error | null]> => {
  const [voucher, err] = await dao.voucher.find.validById(id);
  if (err) {
    return [null, err];
  }
  return [voucher as IVoucherDetail, null];
};
export default {
  validById,
};
