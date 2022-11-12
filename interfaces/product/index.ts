interface IProductCreate {
  productId: string;
  shopId: string;
  name: string;
  description: string;
  weight: number;
  width: number;
  height: number;
  length: number;
  price: number;
  avatar: string;
  quantity: number;
  discount: number;
  isActive: boolean;
  isDeleted: boolean;
}

export { IProductCreate };
