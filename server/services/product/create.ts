import { IProductCreate } from "../../../interfaces/product";
import { Product } from "../../../modules/database/entities";
import dao from "../../dao";

const fromRabbit = async (payload: IProductCreate) => {
  const p = new Product();
  p.id = payload.productId;
  p.name = payload.name;
  p.description = payload.description;
  p.discount = payload.discount;
  p.quantity = payload.quantity;
  p.shopId = payload.shopId;
  p.length = Math.floor(payload.length);
  p.weight = payload.weight;
  p.width = Math.floor(payload.width);
  p.height = Math.floor(payload.height);
  p.avatar = payload.avatar;
  p.isActive = payload.isActive;
  p.isDeleted = payload.isDeleted;
  p.price = payload.price;

  if (p.weight < 1 || p.height < 1 || p.length < 1 || p.width < 1) {
    console.log("[Rabbit] invalid product information when create");
  }

  const err = await dao.product.create(p);
  if (err) {
    console.log(`[Rabbit] Product err id:${p.id}`);
  }
};

export default {
  fromRabbit,
};
