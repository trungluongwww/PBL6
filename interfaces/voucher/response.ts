import { Column } from "typeorm";

interface IVoucherDetail {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  code: string;
  discountPercent: number;
  discountValue: number;
  quantity: number;
  isActive: boolean;
  isDelete: boolean;
}

export { IVoucherDetail };
