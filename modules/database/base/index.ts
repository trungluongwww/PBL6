import { EntitySubscriberInterface, InsertEvent, UpdateEvent } from "typeorm";
import BaseEntity from "../entities/base";
import { v4 as uuid } from "uuid";

export class Subcriber implements EntitySubscriberInterface<BaseEntity> {
  listenTo() {
    return BaseEntity;
  }

  beforeInsert(event: InsertEvent<BaseEntity>) {
    event.entity.id = uuid();
    if (!event.entity.createdAt) {
      event.entity.createdAt = new Date();
    }
    if (!event.entity.updatedAt) {
      event.entity.updatedAt = new Date();
    }
  }

  beforeUpdate(event: UpdateEvent<BaseEntity>) {
    if (event.entity) {
      event.entity.updatedAt = new Date();
    }
  }
}
