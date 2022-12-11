interface IOrderCreatePayload {
    customerId: string;
    shopId: string;
    address: string;
    toName: string;
    toPhone: string;
    toStreet: string;
    toWardCode: string;
    toDistrictId: number;
    serviceId: number;
    voucherId: string;
    items: Array<IOrderItemPayload>;
}

interface IPaymentOnlinePayload {
    vnp_Amount: string | null,
    vnp_BankCode: string | null,
    vnp_BankTranNo: string | null,
    vnp_CardType: string | null,
    vnp_OrderInfo: string | null,
    vnp_PayDate: string | null,
    vnp_ResponseCode: string | null,
    vnp_TmnCode: string | null,
    vnp_TransactionNo: string | null,
    vnp_TxnRef: string | null,
    vnp_SecureHash: string | null,
    vnp_SecureHashType: string | null,
    vnp_TransactionStatus:string|null
}

interface IOrderCalculatePayload {
    header: string | Array<string>
    customerId: string;
    shopId: string;
    serviceId: number;
    voucherId: string;
    items: Array<IOrderItemPayload>;
}

interface IOrderItemPayload {
    product_id: string;
    quantity: number;
}

interface IOrderQuerySearchByUser {
    page: number;
    limit: number;
    status: string | null;
    currentUserId: string;
    userType: string;
    shopId: string;
}

interface IOrderDetailQuery {
    currentUserId: string;
    userType: string;
    orderId: string;
}

interface IOrderUpdateStatusPayload {
    status: string;
    reason: string;
    orderId: string;
    currentUserId: string;
    userType: string;
}

interface IOrderDeletePayload {
    currentUserId: string;
    typeUser: string;
    orderId: string;
}

export {
    IOrderCreatePayload,
    IOrderItemPayload,
    IOrderQuerySearchByUser,
    IOrderDetailQuery,
    IOrderUpdateStatusPayload,
    IOrderDeletePayload,
    IOrderCalculatePayload,
    IPaymentOnlinePayload
};
