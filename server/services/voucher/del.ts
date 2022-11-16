import { IRemoveReviewPayload } from "../../../interfaces/review";
import dao from "../../dao";
import { IVoucherDeletePayload } from "../../../interfaces/voucher";
import constants from "../../../constants";

const byId = async (payload: IVoucherDeletePayload) => {
  const [v, _] = await dao.voucher.find.byId(payload.id);
  if (!v) {
    return Error("not found");
  }

  if (payload.role != constants.account.role.admin) {
    return Error("no permission");
  }

  const err = await dao.voucher.del.byId(v.id);

  return err;
};

export default {
  byId,
};
