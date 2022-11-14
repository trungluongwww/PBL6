import dao from "../../dao";
import { IVoucherUpdatePayload } from "../../../interfaces/voucher";

const byId = async (payload: IVoucherUpdatePayload): Promise<Error | null> => {
  const [voucher, _] = await dao.voucher.find.byId(payload.id);
  if (!voucher) {
    return Error("voucher not found");
  }
  const existCode = await dao.voucher.find.validByCode(payload.code);
  if (existCode) {
    return Error("code already exist");
  }

  voucher.name = payload.name;
  voucher.description = payload.description;
  voucher.code = payload.code;
  voucher.discountPercent = payload.discountPercent;
  voucher.discountValue = payload.discountValue;
  voucher.quantity = payload.quantity;
  voucher.isActive = payload.isActive;

  const err = await dao.voucher.update.byId(voucher);

  return err;
};

export default {
  byId,
};
