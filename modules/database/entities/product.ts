import { Column, Entity } from "typeorm";
import BaseEntity from "./base";

@Entity({ name: "products" })
export default class Product extends BaseEntity {
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
    type: "decimal",
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
    type: "decimal",
    name: "discount",
    default: 0,
  })
  discount: number;

  @Column({
    type: "boolean",
    name: "active",
  })
  isActive: boolean;
}
