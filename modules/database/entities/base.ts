import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export default class BaseEntity {
  @PrimaryColumn({})
  id: string;

  @Column({
    name: "created_at",
    type: "timestamp with time zone",
  })
  createdAt: Date;

  @Column({
    name: "updated_at",
    type: "timestamp with time zone",
  })
  updatedAt: Date;

  @BeforeInsert()
  setId() {
    if (!this.id) {
      this.id = uuid();
    }
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
    if (!this.updatedAt) {
      this.updatedAt = new Date();
    }
  }
  @BeforeUpdate()
  setTime() {
    this.updatedAt = new Date();
  }
}
