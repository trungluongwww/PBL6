import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import constants from "../../../constants";
import BaseEntity from "./base";
import { v4 as uuid } from "uuid";

@Entity("accounts")
export default class Account extends BaseEntity {
  @Column({
    type: "text",
    name: "name",
    nullable: false,
  })
  name: string;

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
}
