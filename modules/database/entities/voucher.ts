import { Column, Entity } from "typeorm";
import BaseEntity from "./base";

@Entity({ name: "vouchers" })
export default class Voucher extends BaseEntity {
  @Column({
    name: "name",
    type: "varchar",
    nullable: false,
  })
  name: string;

  @Column({
    name: "description",
    type: "varchar",
  })
  description: string;

  @Column({
    name: "code",
    type: "varchar",
    nullable: false,
  })
  code: string;

  @Column({
    type: "decimal",
    name: "discount_percent",
    default: 0,
  })
  discountPercent: number;

  @Column({
    type: "decimal",
    name: "discount_value",
    default: 0,
  })
  discountValue: number;

  @Column({
    name: "quantity",
    type: "int",
  })
  quantity: number;

  @Column({
    type: "boolean",
    name: "is_active",
  })
  isActive: boolean;

  @Column({
    name: "is_delete",
    type: "boolean",
    default: false,
  })
  isDelete: boolean;
}
