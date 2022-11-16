import { IVoucherDetail } from "../../../interfaces/voucher";
import dao from "../../dao";
import { Voucher } from "../../../modules/database/entities";

const validById = async (
  id: string
): Promise<[IVoucherDetail | null, Error | null]> => {
  const [voucher, err] = await dao.voucher.find.validById(id);
  if (err) {
    return [null, err];
  }
  return [voucher as IVoucherDetail, null];
};

const active = async (): Promise<[Array<Voucher>, Error | null]> => {
  const [voucher, err] = await dao.voucher.find.active();

  if (err) {
    return [[], err];
  } else {
    return [voucher, null];
  }
};

export default {
  validById,
  active,
};
