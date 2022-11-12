interface IVoucherPayload {
  name: string;

  description: string;

  code: string;

  discountPercent: number;

  discountValue: number;

  quantity: number;

  isActive: boolean;
}

interface IVoucherUpdatePayload {
  name: string;

  description: string;

  code: string;

  discountPercent: number;

  discountValue: number;

  quantity: number;

  isActive: boolean;
}

export { IVoucherPayload };
