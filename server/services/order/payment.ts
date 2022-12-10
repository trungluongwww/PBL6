import {IOrderCalculatePayload, IOrderCreatePayload} from "../../../interfaces/order";
import services from "../index";
import delivery from "../../../modules/delivery";
import dateFormat from "dateformat";
import querystring from "qs";
import crypto from "crypto";
import redis from "../../../modules/redis";
import {v4} from "uuid";

interface IOrderCreatePayment {
    url: string
}

const createPayment  = async (payload: IOrderCreatePayload):Promise<[IOrderCreatePayment|null,Error|null]>=>{
    const orderId = v4()

    const [customer, e] = await services.account.find.byId(payload.customerId);

    if (e || !customer) {
        return [null,Error("account not found")];
    }

    let [orderInfo, err] = await services.product.calculator.infoOrder(
        payload.items,
        payload.shopId
    );

    if (err || !orderInfo) {
        return [null,err];
    }

    let [shop, _] = await services.account.find.byId(payload.shopId);

    if (!shop) {
        return [null,Error("Invalid shop id")];
    }
    if (shop.id == customer.id) {
        return [null,Error("Không thể mua hàng của chính bạn")];
    }

    let voucherDiscount =0;
    if (payload.voucherId) {
        const [voucher, _] = await services.voucher.find.validById(
            payload.voucherId
        );
        if (!voucher) {
            return [null,Error("Voucher not found")];
        }
        if (voucher.discountPercent) {
            voucherDiscount=
                (orderInfo.insurance_value - orderInfo.discount) * voucher.discountPercent;
        } else {
            voucherDiscount = voucher.discountValue;
        }
    }
    let deliveryFee = 0;
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
            return [null,err];
        }

        deliveryFee = feeData?.total || 0;
    }

    if (err) {
        return err;
    }

    let totalDiscount = voucherDiscount + orderInfo.discount;
    let total = orderInfo.insurance_value + deliveryFee - totalDiscount;


    const rs = {
        url:getPaymentURL(total,orderId)
    } as IOrderCreatePayment

    // cache
    const strData = JSON.stringify(payload)
    const key = redis.key.payment(orderId)
    await redis.set.keyValueWithTTL(key,strData,3600)
    console.log(orderId)
    return [rs,null]
}

const getPaymentURL = (total:number,orderId:string):string=>{
    let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    let returnUrl = "http://localhost:3000/order/payment-response";

    let date = new Date();
    let createDate = dateFormat(date, "yyyymmddHHmmss");
    let vnp_Params : any = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = "T0DMY8B6";
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params["vnp_Locale"] = "vn";
    vnp_Params["vnp_CurrCode"] = "VND";
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = "Thanh toán hóa đơn shopbee";
    vnp_Params["vnp_OrderType"] = "billpayment";
    vnp_Params["vnp_Amount"] = total * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = "localhost:3000";
    vnp_Params["vnp_CreateDate"] = createDate;
    vnp_Params = sortObject(vnp_Params);

    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", "HJIPHZCZAINQNMTCHBUXRHPUFYUATIJE");
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

export default {
    createPayment,
}