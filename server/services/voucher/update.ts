import dao from "../../dao";
import { IVoucherUpdatePayload } from "../../../interfaces/voucher";

const byId = async (payload: IVoucherUpdatePayload): Promise<Error | null> => {
  const [voucher, _] = await dao.voucher.find.byId(payload.id);
  if (!voucher) {
    return Error("không tìm thấy voucher này");
  }
  const [existCode,err1] = await dao.voucher.find.validByCode(payload.code);
  console.log(voucher.code,payload.code)
  if (existCode && (voucher.code != payload.code)) {
    return Error("code voucher đã tồn lại ");
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
