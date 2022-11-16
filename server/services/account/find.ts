import { IAccountDetail } from "../../../interfaces/account";
import dao from "../../dao";

const byId = async (
  id: string
): Promise<[IAccountDetail | null, Error | null]> => {
  const [acc, err] = await dao.account.find.byId(id);
  if (err) {
    return [null, err];
  }
  return [acc as IAccountDetail, null];
};

export default {
  byId,
};
