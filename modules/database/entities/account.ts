import { Column, Entity } from "typeorm";
import constants from "../../../constants";
import BaseEntity from "./base";

@Entity("accounts")
export default class Account extends BaseEntity {
  @Column({
    type: "text",
    name: "name",
    nullable: false,
  })
  name: string;

  @Column({
    type: "varchar",
    name: "avatar",
    nullable: true,
    default: "default.png",
  })
  avatar: string;

  @Column({
    type: "enum",
    enum: constants.account.role.all,
    name: "role",
    nullable: false,
  })
  role: string;

  @Column({
    type: "varchar",
    nullable: false,
    name: "email",
  })
  email: string;

  @Column({
    type: "varchar",
    nullable: false,
    name: "phone",
  })
  phone: string;

  @Column({
    type: "int",
    nullable: true,
    name: "district_id",
  })
  districtId: number;

  @Column({
    type: "int",
    name: "province_id",
    nullable: true,
  })
  provinceId: number;

  @Column({
    type: "varchar",
    name: "ward_code",
    nullable: true,
  })
  wardCode: string;

  @Column({
    name: "address",
    type: "text",
    nullable: true,
  })
  address: string;
}
