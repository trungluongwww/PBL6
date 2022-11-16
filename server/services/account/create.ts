import { INewUser } from "../../../interfaces/rabbit";
import { Account } from "../../../modules/database/entities";
import dao from "../../dao";

const addUserFromRabbit = async (newUser: INewUser, role: string | null) => {
  const distrcict = Number(newUser.profile.district_code);
  const province = Number(newUser.profile.province_code);
  if (!distrcict || !province) {
    console.log("[Rabbit Error] Error when add account, invalid address id");
    return;
  }
  const account = new Account();
  account.id = newUser.id;
  account.name = newUser.profile.name;
  account.avatar = newUser.profile.avatar;
  role ? (account.role = role) : {};
  account.email = newUser.profile.email;
  account.phone = newUser.profile.phone_number;
  account.districtId = distrcict;
  account.provinceId = province;
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
