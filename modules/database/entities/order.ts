import {
  AfterInsert,
  AfterUpdate,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import BaseEntity from "./base";
import constants from "../../../constants";
import Account from "./account";
import Voucher from "./voucher";
import database from "../index";

@Entity("orders")
export default class Order extends BaseEntity {
  @ManyToOne(() => Account, (account) => account.id, { nullable: false })
  @JoinColumn({ name: "client_id" })
  client: Account;

  @Column({
    type: "varchar",
    name: "client_id",
    nullable: false,
  })
  clientId: string;

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
    default: constants.order.status.waitingVerify,
  })
  status: string;

  @Column({
    name: "delete",
    type: "boolean",
    default: false,
  })
  isDelete: boolean;

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
    if (!this.total) {
      this.totalDiscount = this.voucherDiscount + this.productDiscount;
      this.total = this.totalPrice + this.deliveryFee - this.totalDiscount;
    }
  }
}
