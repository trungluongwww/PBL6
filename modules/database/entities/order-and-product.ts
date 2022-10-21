import {
  AfterInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import Order from "./order";
import Product from "./product";
import BaseEntity from "./base";
import database from "../index";

@Entity("order_and_products")
export default class OrderAndProduct extends BaseEntity {
  @ManyToOne(() => Order, (order) => order.id, { nullable: false })
  @JoinColumn({ name: "order_id" })
  @Index()
  order: Order;

  @Column({ name: "order_id" })
  orderId: string;

  @ManyToOne(() => Product, (product) => product.id, { nullable: false })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column({ name: "product_id" })
  productId: string;

  @Column({ name: "quantity", type: "int" })
  quantity: number;

  @Column({
    name: "comment",
    type: "text",
    nullable: true,
    default: null,
  })
  comment: string;

  @Column({
    name: "rating",
    type: "float",
    nullable: true,
    default: null,
  })
  rating: number;

  @AfterInsert()
  async after() {
    try {
      await database
        .getDataSource()
        .createQueryBuilder()
        .update(Product)
        .set({
          quantity: () => `quantity - ${this.quantity}`,
        })
        .where("id =:id", { id: this.productId })
        .execute();
    } catch (err) {
      console.log("***Error when update quantity product");
      process.exit(1);
    }
  }
}
