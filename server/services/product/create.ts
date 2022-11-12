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
  p.length = payload.length;
  p.weight = payload.weight;
  p.width = payload.width;
  p.height = payload.height;
  p.avatar = payload.avatar;
  p.isActive = payload.isActive;
  p.isDeleted = payload.isDeleted;
  p.price = payload.price;

  const err = await dao.product.create(p);
  if (err) {
    console.log(`Product err id:${p.id}`);
  }
};

export default {
  fromRabbit,
};
