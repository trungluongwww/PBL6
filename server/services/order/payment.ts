import {
    IOrderCalculatePayload,
    IOrderCreatePayload,
    IOrderItemPayload,
    IPaymentOnlinePayload
} from "../../../interfaces/order";
import services from "../index";
import delivery from "../../../modules/delivery";
import dateFormat from "dateformat";
import querystring from "qs";
import crypto from "crypto";
import redis from "../../../modules/redis";
import util from "../../../ultilities/strings"
import {Order} from "../../../modules/database/entities";
import constants from "../../../constants";
import queryString from 'qs'
import {data} from "@serverless/cloud";
import transaction from "../../transaction";
import email from "../../../modules/email";

interface IOrderCreatePayment {
    url: string|null
}

interface IOrderPaymentCache {
    order: IOrderCache
    items: Array<IOrderItemPayload>
}

interface IOrderCache {
    customerId :string
    shopId :string
    address :string
    toName :string
    toPhone :string
    toStreet :string
    toWardCode :string
    toDistrictId :number
    serviceId :number
    voucherId :string
    productIds:Array<string>
    totalPrice :number
    productDiscount :number
    status :string
    voucherDiscount:number
    deliveryFee:number
    totalDiscount:number
    total:number
}

const createPayment  = async (payload: IOrderCreatePayload):Promise<[IOrderCreatePayment|null,Error|null]>=>{
    const orderId = util.random.randomeCode()

    const productIds = payload.items.map((item) => item.product_id);
    const [customer, e] = await services.account.find.byId(payload.customerId);
    if (e || !customer) {
        return [{url:null},Error("account not found")];
    }

    let [orderInfo, err] = await services.product.calculator.infoOrder(
        payload.items,
        payload.shopId
    );

    if (err || !orderInfo) {
        return  [{url:null},err];
    }

    let [shop, _] = await services.account.find.byId(payload.shopId);

    if (!shop) {
        return  [{url:null},Error("không tìm thấy shop")];
    }

    if (shop.id == customer.id) {
        return  [{url:null},Error("Không thể mua hàng của chính bạn")];
    }

    // create cache order
    const order = {
        customerId : payload.customerId,
        shopId : payload.shopId,
        address : payload.address,
        toName : customer.name,
        toPhone : customer.phone,
        toStreet : customer.address,
        toWardCode : customer.wardCode,
        toDistrictId : customer.districtId,
        serviceId : payload.serviceId,
        voucherId : payload.voucherId,
        productIds : productIds,
        totalPrice : orderInfo.insurance_value,
        productDiscount : orderInfo.discount,
        status : constants.order.status.waitForConfirm,
    } as IOrderCache;


    if (payload.voucherId) {
        const [voucher, _] = await services.voucher.find.validById(
            payload.voucherId
        );
        if (!voucher) {
            return [{
                url:null
            } as IOrderCreatePayment,err];
        }
        if (voucher.discountPercent) {
            order.voucherDiscount =
                (order.totalPrice - order.productDiscount) * voucher.discountPercent;
        } else {
            order.voucherDiscount = voucher.discountValue;
        }
    }

    {
        const [feeData, err] = await delivery.shippingOrder.calculateFee(
            {
                items: payload.items,
                service_id: payload.serviceId,
                to_ward_code: customer.wardCode,
                to_district_id: customer.districtId,
                from_district_id: shop.districtId,
            },
            orderInfo
        );
        if (err) {
            return [{
                url:null
            } as IOrderCreatePayment,err];
        }

        order.deliveryFee = feeData?.total || 0;
    }

    order.totalDiscount = order.voucherDiscount + order.productDiscount;
    order.total = order.totalPrice + order.deliveryFee - order.totalDiscount;



    const rs = {
        url:getPaymentURL(order.total,orderId)
    } as IOrderCreatePayment
    // cache
    const data = {
        items:payload.items,
        order:order
    }as IOrderPaymentCache
    const strData = JSON.stringify(data)
    const key = redis.key.payment(orderId)
    await redis.set.keyValueWithTTL(key,strData,3600)

    return [rs,null]
}

const getPaymentURL = (total:number,id:string):string=>{
    let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    let returnUrl = "http://localhost:3000/order/payment-response";

    let date = new Date();
    let createDate = dateFormat(date, "yyyymmddHHmmss");
    let orderId = dateFormat(date, "HHmmss");
    let vnp_Params : any = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = "T0DMY8B6";
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params["vnp_Locale"] = "vn";
    vnp_Params["vnp_CurrCode"] = "VND";
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = id;
    vnp_Params["vnp_OrderType"] = "billpayment";
    vnp_Params["vnp_Amount"] = total * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = "localhost:3000";
    vnp_Params["vnp_CreateDate"] = createDate;
    vnp_Params = sortObject(vnp_Params);

    let secretKey = process.env.VNPAY_SECRET_KEY || ""


    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
    return vnpUrl
}

function sortObject(obj:any) {
    let sorted:any = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

const receivePayment = async (p : IPaymentOnlinePayload):Promise<Error|null>=>{
    let dataVnp :any = {
        "vnp_Amount":p.vnp_Amount,
        "vnp_BankCode":p.vnp_BankCode,
        "vnp_BankTranNo":p.vnp_BankTranNo,
        "vnp_CardType":p.vnp_CardType,
        "vnp_OrderInfo":p.vnp_OrderInfo,
        "vnp_PayDate":p.vnp_PayDate,
        "vnp_ResponseCode":p.vnp_ResponseCode,
        "vnp_TmnCode":p.vnp_TmnCode,
        "vnp_TransactionNo":p.vnp_TransactionNo,
        "vnp_TransactionStatus":p.vnp_TransactionStatus,
        "vnp_TxnRef":p.vnp_TxnRef,
    }

    let secureHash = p.vnp_SecureHash;

    let secretKey = process.env.VNPAY_SECRET_KEY || ""

    dataVnp = sortObject(dataVnp)

    let signData = querystring.stringify(dataVnp, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    if (secureHash !== signed){
        return Error("thanh toán thất bại")
    }

    // get data redis
    if(!p.vnp_OrderInfo){
        return Error("không tìm thấy đơn hàng")
    }
    const key = redis.key.payment(p.vnp_OrderInfo)
    const dataStr =await redis.get.byKey(key)
    if(!dataStr){
        return Error("không tìm thấy đơn hàng")
    }
    const data = JSON.parse(dataStr) as IOrderPaymentCache

    const order = convertToModelOrder(data.order)

    const err = await transaction.order.create(order, data.items);

    if (err) {
        return err;
    }
    await redis.del.byKey(key)
    const [customer, _] = await services.account.find.byId(data.order.customerId);
    if (!customer) {
        return null;
    }

    if (customer.email) {
        email.order.createOrder(customer.email, data.order.total);
    }
    return null
}

const convertToModelOrder = (payload : IOrderCache):Order=>{
    const order = new Order()
    order.customerId = payload.customerId;
    order.shopId = payload.shopId;
    order.address = payload.address;
    order.toName = payload.toName;
    order.toPhone = payload.toPhone;
    order.toStreet = payload.address;
    order.toWardCode = payload.toWardCode;
    order.toDistrictId = payload.toDistrictId;
    order.serviceId = payload.serviceId;
    order.voucherId = payload.voucherId;
    order.productIds = payload.productIds;
    order.totalPrice = payload.totalPrice;
    order.productDiscount = payload.productDiscount;
    order.status = payload.status;
    order.voucherDiscount= payload.voucherDiscount;
    order.deliveryFee= payload.deliveryFee;
    order.totalDiscount= payload.totalDiscount;
    order.total= payload.total;
    order.paymentMethod = constants.order.paymentMethod.online
    order.paymentName = constants.order.paymentMethod.onlineName

    return order
}

export default {
    createPayment,
    receivePayment
}