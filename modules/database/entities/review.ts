import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import Order from "./order";
import BaseEntity from "./base";
import Account from "./account";

@Entity("reviews")
export default class OrderAndProduct extends BaseEntity {
  @ManyToOne(() => Order, (order) => order.id, { nullable: false })
  @JoinColumn({ name: "order_id" })
  @Index()
  order: Order;

  @Column({ name: "order_id" })
  orderId: string;

  @ManyToOne(() => Account, (account) => account.id, { nullable: false })
  @JoinColumn({ name: "customer_id" })
  customer: Account;

  @Column({ name: "customer_id" })
  customerId: string;

  @Column({
    name: "product_ids",
    type: "varchar",
    array: true,
  })
  productIds: string[];

  @Column({
    name: "content",
    type: "text",
  })
  content: string;

  @Column({
    name: "rating",
    type: "float",
    default: null,
    nullable: true,
  })
  rating: number;

  @Column({
    name: "is_deleted",
    type: "boolean",
    default: false,
  })
  isDeleted: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  edit() {
    if (this.rating) {
      this.rating = Math.round(this.rating);
    }
  }
}
