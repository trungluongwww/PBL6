import { Column, Entity } from "typeorm";
import BaseEntity from "./base";

@Entity({ name: "products" })
export default class Product extends BaseEntity {
  @Column({
    name: "shopId",
    type: "varchar",
    nullable: false,
  })
  shopId: string;

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
    name: "weight",
    type: "int",
    default: 0,
  })
  weight: number;

  @Column({
    name: "width",
    type: "int",
  })
  width: number;

  @Column({
    name: "height",
    type: "int",
  })
  height: number;

  @Column({
    name: "length",
    type: "int",
  })
  length: number;

  @Column({
    type: "decimal",
    name: "price",
    default: 0,
  })
  price: number;

  @Column({
    name: "avatar",
    type: "varchar",
    nullable: false,
  })
  avatar: string;

  @Column({
    name: "quantity",
    type: "int",
    default: 0,
  })
  quantity: number;

  @Column({
    type: "decimal",
    name: "discount",
    default: 0,
    nullable: true,
  })
  discount: number;

  @Column({
    type: "boolean",
    name: "is_active",
  })
  isActive: boolean;

  @Column({
    type: "boolean",
    name: "is_deleted",
  })
  isDeleted: boolean;
}
