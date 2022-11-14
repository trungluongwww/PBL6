import { Account, Order } from "../../../modules/database/entities";
import database from "../../../modules/database";
import constants from "../../../constants";

const byId = async (id: string, typeUser: string): Promise<Error | null> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder().update(Order);
    if (typeUser == constants.account.role.customer)
      q.set({
        isCustomerDeleted: true,
      });
    else
      q.set({
        isShopDeleted: true,
      });
    q.where("id = :id", { id });
    await q.execute();
    return null;
  } catch (err: unknown) {
    console.log("*** Error when delete order:", err);
    return err as Error;
  }
};

const byAdmin = async (id: string): Promise<Error | null> => {
  const db = database.getDataSource();

  try {
    const q = db.createQueryBuilder().update(Order);
    q.where("id = :id", { id });
    await q.execute();
    return null;
  } catch (err: unknown) {
    console.log("*** Error when delete order:", err);
    return err as Error;
  }
};

export default {
  byId,
  byAdmin,
};
