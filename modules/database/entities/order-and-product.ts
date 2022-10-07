import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import Order from "./order";
import Product from "./product";
import BaseEntity from "./base";

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
}
