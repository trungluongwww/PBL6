import { Column } from "typeorm";
import constants from "../../constants";

interface IAccountDetail {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  districtId: number;
  provinceId: number;
  wardCode: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export { IAccountDetail };
