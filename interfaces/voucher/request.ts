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
  id: string;

  name: string;

  description: string;

  code: string;

  discountPercent: number;

  discountValue: number;

  quantity: number;

  isActive: boolean;
}

interface IVoucherDeletePayload {
  id: string;
  role: string;
  currentUserId: string;
}

export { IVoucherPayload, IVoucherUpdatePayload, IVoucherDeletePayload };
