import { constants } from "os";
import { Column } from "typeorm";
import { Voucher } from "../../../modules/database/entities";
import dao from "../../dao";
import { IVoucherPayload } from "../../../interfaces/voucher";

export default async (payload: IVoucherPayload): Promise<Error | null> => {
  const voucher = new Voucher();

  voucher.name = payload.name;
  voucher.description = payload.description;
  voucher.code = payload.code;
  voucher.discountValue = payload.discountValue;
  voucher.discountPercent = payload.discountPercent;
  voucher.quantity = payload.quantity;
  voucher.isActive = payload.isActive;

  const [alreadyExistVoucher, _] = await dao.voucher.find.validByCode(
    payload.code
  );
  if (alreadyExistVoucher) {
    return Error("Đã tồn tại voucher với code");
  }
  const err = await dao.voucher.create(voucher);

  if (err) {
    return err;
  }

  return null;
};
