import {
  AfterInsert,
  AfterUpdate,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import BaseEntity from "./base";
import constants from "../../../constants";
import Account from "./account";
import Voucher from "./voucher";
import database from "../index";
import { OrderAndProduct } from "./index";
import strings from "../../../ultilities/strings";

@Entity("orders")
export default class Order extends BaseEntity {
  @Column({
    type: "varchar",
    name: "code",
    nullable: true,
  })
  code: string;

  @ManyToOne(() => Account, (account) => account.id, { nullable: false })
  @JoinColumn({ name: "customer_id" })
  customer: Account;

  @Column({
    type: "varchar",
    name: "customer_id",
    nullable: false,
  })
  customerId: string;

  @ManyToOne(() => Account, (account) => account.id, { nullable: false })
  @JoinColumn({ name: "shop_id" })
  shop: Account;

  @Column({
    type: "varchar",
    name: "shop_id",
    nullable: false,
  })
  shopId: string;

  @Column({
    type: "text",
    name: "address",
  })
  address: string;

  @Column({
    type: "int",
    name: "from_disctrict_id",
    nullable: true,
  })
  fromDistrictId: number;

  @Column({
    name: "to_name",
    type: "text",
  })
  toName: string;

  @Column({
    name: "to_phone",
    type: "text",
  })
  toPhone: string;

  @Column({
    name: "to_street",
    type: "text",
  })
  toStreet: string;

  @Column({
    name: "to_ward_code",
    type: "varchar",
  })
  toWardCode: string;

  @Column({
    name: "to_district_id",
    type: "int",
  })
  toDistrictId: number;

  @Column({
    name: "service_id",
    type: "int",
  })
  serviceId: number;

  @ManyToOne(() => Voucher, (voucher) => voucher.id, { nullable: true })
  @JoinColumn({ name: "voucher_id" })
  voucher: Voucher;

  @Column({
    name: "voucher_id",
    type: "varchar",
    default: null,
    nullable: true,
  })
  voucherId: string;

  @Column({
    name: "product_ids",
    type: "varchar",
    array: true,
  })
  productIds: string[];

  @Column({
    name: "total_discount",
    type: "decimal",
    default: 0,
  })
  totalDiscount: number;

  @Column({
    name: "product_discount",
    type: "decimal",
    default: 0,
  })
  productDiscount: number;

  @Column({
    name: "voucher_discount",
    type: "decimal",
    default: 0,
  })
  voucherDiscount: number;

  @Column({
    name: "total_price",
    type: "decimal",
    default: 0,
  })
  totalPrice: number;

  @Column({
    name: "delivery_fee",
    type: "decimal",
    default: 0,
  })
  deliveryFee: number;

  @Column({
    name: "total",
    type: "decimal",
    default: 0,
  })
  total: number;

  @Column({
    name: "status",
    type: "enum",
    enum: constants.order.status.all,
    default: constants.order.status.waitForConfirm,
  })
  status: string;

  @Column({
    name: "search",
    type: "text",
    default: "",
  })
  search: string;

  @Column({
    name: "is_shop_deleted",
    type: "boolean",
    default: false,
  })
  isShopDeleted: boolean;

  @Column({
    name: "is_customer_deleted",
    type: "boolean",
    default: false,
  })
  isCustomerDeleted: boolean;

  @OneToMany(() => OrderAndProduct, (oap) => oap.order)
  items: OrderAndProduct[];

  @AfterInsert()
  async after() {
    try {
      await database
        .getDataSource()
        .createQueryBuilder()
        .update(Voucher)
        .set({
          quantity: () => "quantity - 1",
        })
        .where("id = :id", { id: this.voucherId })
        .execute();
    } catch (err: unknown) {
      console.log("Error when update voucher quantity", err);
      process.exit(1);
    }
  }
  @BeforeInsert()
  before() {
    this.code = strings.random.randomeCode();
    if (!this.total) {
      this.totalDiscount = this.voucherDiscount + this.productDiscount;
      this.total = this.totalPrice + this.deliveryFee - this.totalDiscount;
    }
  }
}
