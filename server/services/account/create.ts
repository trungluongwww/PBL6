import { INewUser } from "../../../interfaces/rabbit";
import { Account } from "../../../modules/database/entities";
import dao from "../../dao";

const addUserFromRabbit = async (newUser: INewUser, role: string | null) => {
  const account = new Account();
  account.id = newUser.id;
  account.name = newUser.profile.name;
  account.avatar = newUser.profile.avatar;
  role ? (account.role = role) : {};
  account.email = newUser.profile.email;
  account.phone = newUser.profile.phone_number;
  account.districtId = Number(newUser.profile.district_code);
  account.provinceId = Number(newUser.profile.province_code);
  account.wardCode = newUser.profile.ward_code;
  account.address = newUser.profile.address;

  const err = await dao.account.create(account);
  if (!err) {
    console.log("[new] add user from rabbit");
  }
  return;
};

export default {
  addUserFromRabbit,
};
